import { ClassConstructor } from 'class-transformer'

export const repositoryList: Array<{ symbol: symbol, class: ClassConstructor<unknown> }> = []

export const repository = (interfaceSymbol: symbol) => {
  return (constructor: ClassConstructor<unknown>) => {
    repositoryList.push({ symbol: interfaceSymbol, class: constructor })
  }
}
