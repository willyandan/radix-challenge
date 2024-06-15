import { ClassConstructor } from 'class-transformer'

export const databaseList: Array<ClassConstructor<unknown>> = []

export const database = (constructor: ClassConstructor<unknown>) => {
  databaseList.push(constructor)
}
