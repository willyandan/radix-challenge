import { ClassConstructor } from 'class-transformer'
import { IController } from '../application/controller/IController'

export const controllerList: Array<ClassConstructor<IController>> = []

export const controller = (constructor: ClassConstructor<IController>) => {
  controllerList.push(constructor)
}
