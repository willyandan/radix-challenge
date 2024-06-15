import { inject, injectable } from 'inversify'
import { MongoDb } from '../database/MongoDb'
import { env } from '../../env'
import { ISensorRepository, ISensorRepositorySymbol } from '../../domain/repositories/ISensorRepository'
import { Sensor } from '../../domain/models/Sensor'
import { repository } from '../../decorators/repositories'
import { SensorAverageByTimeParams } from '../../domain/models/SensorAverageByTimeParams'
import { SensorAverageByTime } from '../../domain/models/SensorAverageByTime'

const SENSOR_COLLECTION = 'sensor'

@injectable()
@repository(ISensorRepositorySymbol)
export class SensorMongoRepository implements ISensorRepository {

  @inject(MongoDb)
  private mongoDb!: MongoDb

  private connect() {
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

  async getAverageByTime(params: SensorAverageByTimeParams): Promise<Array<SensorAverageByTime>> {
    const database = await this.connect()
    const collection = database.collection(SENSOR_COLLECTION)
    const results = await collection.aggregate([
      {
        $project: {
          equipmentId: 1,
          value: 1,
          truncatedDate: {
            $dateTrunc: {
              date: '$timestamp',
              unit: params.unit
            }
          }
        }
      },
      {
        $group: {
          _id: {
            truncatedDate: '$truncatedDate',
            equipmentId: '$equipmentId'
          },
          average: { $avg: '$value' }
        }
      },
      {
        $group: {
          _id: '$_id.truncatedDate',
          equipments: {
            $push: {
              equipmentId: '$_id.equipmentId',
              average: '$average'
            }
          }
        }
      },
      {
        $sort: {
          '_id': -1
        }
      },
      {
        $limit: params.limit
      }
    ]).toArray()

    return results.map((result) => new SensorAverageByTime(result._id, result.equipments))

  }
}
