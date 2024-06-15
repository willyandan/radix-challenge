import { Router as ExpressRouter, Request } from 'express'
import { IRequest } from '../application/http/requests/IRequest'
import { IResponse } from '../application/http/responses/IResponse'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { HttpStatusEnum } from '../application/http/HttpStatusEnum'
import { validateOrReject } from 'class-validator'
import { Container } from './container'
import { IController } from '../application/controller/IController'
import { HttpMethods, RequestMapper, RouteMetadata } from '../decorators/route'
import { controllerList } from '../decorators/controller'
import multer, { Multer } from 'multer'
import { RequestHandler } from 'express-serve-static-core'

type RouteFunction = (req?: IRequest) => Promise<IResponse>

export class Router {
  private router: ExpressRouter
  private multer: Multer

  constructor(
    private container: Container
  ) {
    this.router = ExpressRouter()
    const storage = multer.diskStorage({
      destination: 'public/csv',
      filename(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
      }
    })
    this.multer = multer({ storage })
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
      if (requestType === RequestMapper.FILE) {
        data = { ...data, file: req.file }
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

  private routeExecutor(routeFunction: RouteFunction, routeMetadata: RouteMetadata): RequestHandler {
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

    const hasFile = routeMetadata.requestMapper?.find((val) => val === RequestMapper.FILE)

    const functionsPipeline: Array<RequestHandler> = []
    if (hasFile) {
      functionsPipeline.push(this.multer.single('file'))
    }
    functionsPipeline.push(this.routeExecutor(routeFunction, routeMetadata))

    const methods = {
      [HttpMethods.GET]: () => {
        router.get(routeMetadata.path)
      },
      [HttpMethods.POST]: () => {
        router.post(routeMetadata.path, ...functionsPipeline)
      },
      [HttpMethods.PUT]: () => {
        router.put(routeMetadata.path, ...functionsPipeline)
      },
      [HttpMethods.DELETE]: () => {
        router.delete(routeMetadata.path, ...functionsPipeline)
      },
      [HttpMethods.PATCH]: () => {
        router.patch(routeMetadata.path, ...functionsPipeline)
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
    const controllers = controllerList.map(controller => this.container.container.get<IController>(controller.name))
    this.loadRoutes(controllers)
    return this.router
  }
}
