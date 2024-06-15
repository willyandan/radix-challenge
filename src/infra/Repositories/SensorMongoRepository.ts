import { inject, injectable } from 'inversify'
import { Sensor } from '../../Domain/Models/Sensor'
import { ISensorRepository } from '../../Domain/Repositories/ISensorRepository'
import { MongoDb } from '../database/MongoDb'
import { TYPES } from '../container/types'
import { env } from '../../env'

const SENSOR_COLLECTION = 'sensor'

@injectable()
export class SensorMongoRepository implements ISensorRepository {

  @inject(TYPES.database.MongoDB)
  private mongoDb!: MongoDb

  connect() {
    const db = env('MONGODB_DB') || ''
    return this.mongoDb.connect(db)
  }

  async create(sensor: Sensor): Promise<void> {
    const database = await this.connect()
    const collection = database.collection(SENSOR_COLLECTION)
    await collection.insertOne(sensor)
  }
}
