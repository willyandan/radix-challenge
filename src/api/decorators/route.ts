import { ClassConstructor } from 'class-transformer'
import { IRequest } from '../application/http/requests/IRequest'

export const enum HttpMethods {
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE'
}

export const enum RequestMapper {
  'BODY',
  'PARAMS',
  'QUERY',
  'FILE'
}

export type RouteMetadata = { path: string, method: HttpMethods, requestClass?: ClassConstructor<IRequest>, requestMapper?: Array<RequestMapper> }

export const route = (method: HttpMethods, path: string) => {
  return (target: object, methodName: string) => {
    const routes: Array<string> = Reflect.getMetadata('routes', target) || []
    routes.push(methodName)
    Reflect.defineMetadata('routes', routes, target)

    const metadata = Reflect.getMetadata('routeMetadata', target, methodName)
    Reflect.defineMetadata('routeMetadata', { ...metadata, path, method }, target, methodName)
  }
}


export const request = (requestClass: ClassConstructor<IRequest>, requestMapper: Array<RequestMapper> = [RequestMapper.BODY]) => {
  return (target: object, methodName: string) => {

    const metadata = Reflect.getMetadata('routeMetadata', target, methodName)
    Reflect.defineMetadata('routeMetadata', { ...metadata, requestClass, requestMapper }, target, methodName)
  }
}
