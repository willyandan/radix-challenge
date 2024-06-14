import { ClassConstructor } from 'class-transformer'
import { IRequest } from './IRequest'
import { IResponse } from './IResponse'

export const RouteDecorators = {

  path(name: string, requestClass: ClassConstructor<IRequest>, responseClass: ClassConstructor<IResponse>) {
    return (target: unknown, methodName: string, descriptor: PropertyDescriptor) => {
      descriptor.value.prototype = {
        ...descriptor.value.prototype,
        pathName: name,
        requestClass,
        responseClass
      }
    }
  }

}
