import { inject, injectable } from 'inversify'
import { MongoDb } from '../database/MongoDb'
import { env } from '../../env'
import { ISensorRepository, ISensorRepositorySymbol } from '../../domain/repositories/ISensorRepository'
import { Sensor } from '../../domain/models/Sensor'
import { repository } from '../../decorators/repositories'

const SENSOR_COLLECTION = 'sensor'

@injectable()
@repository(ISensorRepositorySymbol)
export class SensorMongoRepository implements ISensorRepository {

  @inject(MongoDb)
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

  async createMany(sensors: Sensor[]): Promise<void> {
    const database = await this.connect()
    const collection = database.collection(SENSOR_COLLECTION)
    await collection.insertMany(sensors)
  }
}
