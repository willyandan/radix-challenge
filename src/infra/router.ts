import { Router as ExpressRouter, Request, Response, NextFunction } from 'express'
import { IRequest } from '../application/http/requests/IRequest'
import { IResponse } from '../application/http/responses/IResponse'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { HttpStatusEnum } from '../application/http/HttpStatusEnum'
import { validateOrReject } from 'class-validator'
import { TYPES } from './container/types'
import { Container } from './container'
import { IController } from '../application/controller/IController'
import { HttpMethods, RequestMapper, RouteMetadata } from '../decorators/route'

type ExpressRouteFunction = (req: Request, res: Response, next?: NextFunction) => void
type RouteFunction = (req?: IRequest) => Promise<IResponse>

export class Router {
  private router: ExpressRouter
  constructor(
    private container: Container
  ) {
    this.router = ExpressRouter()
  }

  private getHttpRequestData(req: Request, requestMapper: Array<RequestMapper>): Record<string, object> {
    let data = {}
    for (const requestType of requestMapper) {
      if (requestType === RequestMapper.BODY) {
        data = { ...data, ...req.body }
      }
      if (requestType === RequestMapper.PARAMS) {
        data = { ...data, ...req.params }
      }
      if (requestType === RequestMapper.QUERY) {
        data = { ...data, ...req.query }
      }
    }
    return data
  }

  private async getRequestData(req: Request, routeMetadata: RouteMetadata): Promise<IRequest | undefined> {
    if (!routeMetadata.requestClass || !routeMetadata.requestMapper) {
      return undefined
    }
    const requestParams = this.getHttpRequestData(req, routeMetadata.requestMapper)
    const request = plainToInstance(routeMetadata.requestClass, requestParams, { excludeExtraneousValues: true })

    await validateOrReject(request)

    return request
  }

  private routeExecutor(routeFunction: RouteFunction, routeMetadata: RouteMetadata): ExpressRouteFunction {
    return async (req, res) => {
      try {
        const request = await this.getRequestData(req, routeMetadata)
        const result = await routeFunction(request)
        const response = instanceToPlain(result)

        res.status(result.statusCode).json({
          status: HttpStatusEnum[result.statusCode],
          ...response
        })
      } catch (err) {
        return res.status(500).json({ err })
      }

    }
  }

  private registerRoute(router: ExpressRouter, routeFunction: RouteFunction, routeMetadata: RouteMetadata) {

    const methods = {
      [HttpMethods.GET]: () => {
        router.get(routeMetadata.path, this.routeExecutor(routeFunction, routeMetadata))
      },
      [HttpMethods.POST]: () => {
        router.post(routeMetadata.path, this.routeExecutor(routeFunction, routeMetadata))
      },
      [HttpMethods.PUT]: () => {
        router.put(routeMetadata.path, this.routeExecutor(routeFunction, routeMetadata))
      },
      [HttpMethods.DELETE]: () => {
        router.delete(routeMetadata.path, this.routeExecutor(routeFunction, routeMetadata))
      },
      [HttpMethods.PATCH]: () => {
        router.patch(routeMetadata.path, this.routeExecutor(routeFunction, routeMetadata))
      }
    }
    methods[routeMetadata.method]()

  }

  private loadRoutes(controllers: Array<IController>) {
    for (const controller of controllers) {

      const routesNames: Array<string> = Reflect.getMetadata('routes', controller)

      for (const routeName of routesNames) {
        const routeMetadata = Reflect.getMetadata('routeMetadata', controller, routeName) as RouteMetadata
        const controllerAdapted = (controller as unknown) as { [routeName: string]: RouteFunction }
        const routeFunction = controllerAdapted[routeName]
        const bindFunction = routeFunction.bind(controller)

        this.registerRoute(this.router, bindFunction, routeMetadata)

      }

    }
  }

  getRoutes() {
    type keys = keyof typeof TYPES.controllers
    const controllers = Object.keys(TYPES.controllers).map((key: string): IController => {
      const controllerKey = key as keys
      const controller = this.container.container.get<IController>(TYPES.controllers[controllerKey])
      return controller
    })

    this.loadRoutes(controllers)
    return this.router
  }
}
