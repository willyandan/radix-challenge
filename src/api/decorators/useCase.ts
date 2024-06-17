import { ClassConstructor } from 'class-transformer'

export const useCaseList: Array<ClassConstructor<unknown>> = []

export const useCase = (constructor: ClassConstructor<unknown>) => {
  useCaseList.push(constructor)
}
