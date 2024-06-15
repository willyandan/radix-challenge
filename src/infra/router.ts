import { Router as ExpressRouter, Request, Response, NextFunction } from 'express'
import { IRequest } from '../application/routes/IRequest'
import { IResponse } from '../application/routes/IResponse'
import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer'
import { HttpStatusEnum } from '../application/routes/HttpStatusEnum'
import { validate } from 'class-validator'
import { TYPES } from './container/types'
import { Container } from './container'
import { IRoute } from '../application/routes/IRoute'

type ExpressRouteFunction = (req: Request, res: Response, next?: NextFunction) => void
type IRouteMethods = keyof IRoute
type RouteFunction = (req: IRequest) => Promise<IResponse>

export class Router {
  private router: ExpressRouter
  constructor(
    private container: Container
  ) {
    this.router = ExpressRouter()
  }

  private routeExecutor(routeFunction: RouteFunction, requestClass: ClassConstructor<IRequest>): ExpressRouteFunction {
    return async (req, res) => {
      const requestParams = { ...req.query, ...req.body, ...req.params }
      const request = plainToInstance(requestClass, requestParams, { excludeExtraneousValues: true })
      const errorsArray = await validate(request)
      if (errorsArray.length > 0) {
        return res.status(500).json(errorsArray)
      }
      const result = await routeFunction(request)
      const response = instanceToPlain(result)
      res.status(result.statusCode).json({
        status: HttpStatusEnum[result.statusCode],
        ...response
      })
    }
  }

  private registerRoute(router: ExpressRouter, method: IRouteMethods, path: string, routeFunction: RouteFunction, requestClass: ClassConstructor<IRequest>) {

    const methods = {
      get: () => {
        router.get(path, this.routeExecutor(routeFunction, requestClass))
      },
      post: () => {
        router.post(path, this.routeExecutor(routeFunction, requestClass))
      },
      put: () => {
        router.put(path, this.routeExecutor(routeFunction, requestClass))
      },
      delete: () => {
        router.delete(path, this.routeExecutor(routeFunction, requestClass))
      },
      patch: () => {
        router.patch(path, this.routeExecutor(routeFunction, requestClass))
      }
    }
    methods[method]()

  }

  private loadRoutes(routes: Array<IRoute>) {
    const methods: Array<IRouteMethods> = ['get', 'post', 'put', 'delete', 'patch']
    for (const route of routes) {
      for (const method of methods) {
        const routeFunction = route[method]
        if (routeFunction && routeFunction?.prototype) {
          const bindedFunction = routeFunction.bind(route)
          const { pathName, requestClass } = routeFunction.prototype
          this.registerRoute(this.router, method, pathName, bindedFunction, requestClass)
        }
      }
    }
  }

  getRoutes() {
    type keys = keyof typeof TYPES.routes
    const routes = Object.keys(TYPES.routes).map((key: string): IRoute => {
      const routeKey = key as keys
      const route = this.container.container.get<IRoute>(TYPES.routes[routeKey])
      return route
    })
    this.loadRoutes(routes)
    return this.router
  }
}
