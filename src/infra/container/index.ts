import { Container as InversifyContainer } from 'inversify'
import { controllerList } from '../../decorators/controller'
import { IController } from '../../application/controller/IController'
import { useCaseList } from '../../decorators/useCase'
import { databaseList } from '../../decorators/database'
import { repositoryList } from '../../decorators/repositories'

export class Container {
  container = new InversifyContainer()

  loadBinds() {
    //DATABASES
    for (const database of databaseList) {
      this.container.bind(database).toSelf().inSingletonScope()

    }

    //USE CASES
    for (const useCase of useCaseList) {
      this.container.bind(useCase).toSelf().inSingletonScope()

    }

    //REPOSITORIES
    for (const repository of repositoryList) {
      this.container.bind(repository.symbol).to(repository.class).inSingletonScope()
    }

    //CONTROLLER
    for (const controller of controllerList) {
      this.container.bind<IController>(controller.name).to(controller).inSingletonScope()
    }


  }
}
