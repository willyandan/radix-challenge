import { Container as InversifyContainer } from 'inversify'
import { ISensorRepository } from '../../Domain/Repositories/ISensorRepository'
import { TYPES } from './types'
import { SensorMongoRepository } from '../Repositories/SensorMongoRepository'
import { HealthRoute } from '../../application/routes/HealthRoute/HealthRoute'
import { SensorRoute } from '../../application/routes/SensorRoute/SensorRoute'
import { RegisterSensor } from '../../Domain/UseCases/RegisterSensor'
import { MongoDb } from '../database/MongoDb'

export class Container {
  container = new InversifyContainer()

  loadBinds() {
    //DATABASES
    this.container.bind<MongoDb>(TYPES.database.MongoDB).to(MongoDb).inSingletonScope()

    //REPOSITORIES
    this.container.bind<ISensorRepository>(TYPES.repositories.ISensorRepository).to(SensorMongoRepository).inSingletonScope()

    //ROUTES
    this.container.bind<HealthRoute>(TYPES.routes.HealthRoute).to(HealthRoute).inSingletonScope()
    this.container.bind<SensorRoute>(TYPES.routes.SensorRoute).to(SensorRoute).inSingletonScope()

    //USE CASES
    this.container.bind<RegisterSensor>(TYPES.useCases.RegisterSensor).to(RegisterSensor).inSingletonScope()
  }
}
