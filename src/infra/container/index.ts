import { Container as InversifyContainer } from 'inversify'
import { ISensorRepository } from '../../domain/repositories/ISensorRepository'
import { TYPES } from './types'
import { SensorMongoRepository } from '../repositories/SensorMongoRepository'
import { RegisterSensor } from '../../domain/useCases/RegisterSensor'
import { MongoDb } from '../database/MongoDb'
import { SensorController } from '../../application/controller/SensorController'
import { HealthController } from '../../application/controller/HealthController'

export class Container {
  container = new InversifyContainer()

  loadBinds() {
    //DATABASES
    this.container.bind<MongoDb>(TYPES.database.MongoDB).to(MongoDb).inSingletonScope()

    //REPOSITORIES
    this.container.bind<ISensorRepository>(TYPES.repositories.ISensorRepository).to(SensorMongoRepository).inSingletonScope()

    //CONTROLLER
    this.container.bind<HealthController>(TYPES.controllers.HealthController).to(HealthController).inSingletonScope()
    this.container.bind<SensorController>(TYPES.controllers.SensorController).to(SensorController).inSingletonScope()

    //USE CASES
    this.container.bind<RegisterSensor>(TYPES.useCases.RegisterSensor).to(RegisterSensor).inSingletonScope()
  }
}
