import { inject, injectable } from 'inversify'
import { MongoDb } from '../database/MongoDb'
import { env } from '../../env'
import { ISensorRepository, ISensorRepositorySymbol } from '../../domain/repositories/ISensorRepository'
import { Sensor } from '../../domain/models/Sensor'
import { repository } from '../../decorators/repositories'
import { EquipmentAvgOverTime } from '../../domain/models/EquipmentAvgOverTime'
import { GetEquipmentByTimeParams } from '../../domain/repositories/params/GetEquipmentByTimeParams'
import { Document } from 'mongodb'
import { EquipmentStandardDeviation } from '../../domain/models/EquipmentStandardDeviation'
import { GetEquipmentStandardDeviationParams } from '../../domain/repositories/params/GetEquipmentStandardDeviationParams'
import { SensorAverage } from '../../domain/models/SensorAverage'
import { GetSensorAvgParams } from '../../domain/repositories/params/GetSensorAvgParams'

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

  async getEquipmentAvgByTime(params: GetEquipmentByTimeParams): Promise<Array<EquipmentAvgOverTime>> {
    const database = await this.connect()
    const collection = database.collection(SENSOR_COLLECTION)

    const query: Array<Document> = [
      {
        $addFields: {
          startDate: {
            $dateTrunc: {
              date: params.startDate,
              unit: params.unit
            }
          },
          endDate: {
            $dateTrunc: {
              date: params.endDate,
              unit: params.unit
            }
          }
        }
      },
      {
        $match: {
          $expr: {
            $in: ['$equipmentId', params.equipments]
          }
        }
      },

      {
        $addFields: {
          dateDiff: {
            $dateDiff: {
              startDate: '$startDate',
              endDate: '$endDate',
              unit: params.unit
            }
          },
          dateTrunc: {
            $dateTrunc: {
              date: '$timestamp',
              unit: params.unit
            }
          }
        }
      },

      {
        $addFields: {
          date: {
            $map: {
              input: {
                $range: [
                  0,
                  { $add: ['$dateDiff', 1] }
                ]
              },
              as: 'dd',
              in: {
                $dateAdd: {
                  startDate: '$startDate',
                  unit: params.unit,
                  amount: '$$dd'
                }
              }
            }
          }
        }
      },

      { $unwind: '$date' },
      {
        $project: {
          equipmentId: '$equipmentId',
          date: '$date',
          value: {
            $cond: {
              if: {
                $eq: [{ $dateDiff: { startDate: '$dateTrunc', endDate: '$date', unit: params.unit } }, 0]
              },
              then: '$value',
              else: 0
            }
          }
        }
      },
      {
        $group: {
          _id: {
            equipmentId: '$equipmentId',
            date: '$date'
          },
          avg: { $avg: '$value' }
        }
      },
      {
        $sort: {
          '_id.date': 1
        }
      }
    ]

    const results = await collection.aggregate(query).toArray()
    return results.map((result) => new EquipmentAvgOverTime(result._id.date, result._id.equipmentId, result.avg))
  }

  async getEquipmentStdDev(params: GetEquipmentStandardDeviationParams): Promise<EquipmentStandardDeviation[]> {

    const database = await this.connect()
    const collection = database.collection(SENSOR_COLLECTION)
    const results = await collection.aggregate([
      {
        $match: {
          timestamp: {
            $gte: params.startDate,
            $lt: params.endDate
          }
        }
      },
      {
        $group: {
          _id: '$equipmentId',
          stdDev: {
            $stdDevPop: '$value'
          }
        }
      },
      {
        $match: {
          stdDev: {
            $gte: params.threshold
          }
        }
      }
    ]).toArray()

    return results.map((result) => new EquipmentStandardDeviation(result._id, result.stdDev))
  }

  async getSensorAvg(params: GetSensorAvgParams): Promise<SensorAverage[]> {
    const database = await this.connect()
    const collection = database.collection(SENSOR_COLLECTION)
    const results = await collection.aggregate([
      {
        $addFields: {
          startDate: {
            $dateTrunc: {
              date: params.startDate,
              unit: params.unit
            }
          },
          endDate: {
            $dateTrunc: {
              date: params.endDate,
              unit: params.unit
            }
          }
        }
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $lte: ['$timestamp', '$endDate']
              },
              {
                $gte: ['$timestamp', '$startDate']
              }
            ]
          }
        }
      },
      {
        $addFields: {
          dateDiff: {
            $dateDiff: {
              startDate: '$startDate',
              endDate: '$endDate',
              unit: params.unit
            }
          },
          dateTrunc: {
            $dateTrunc: {
              date: '$timestamp',
              unit: params.unit
            }
          }
        }
      },
      {
        $addFields: {
          date: {
            $map: {
              input: {
                $range: [
                  0,
                  {
                    $add: ['$dateDiff', 1]
                  }
                ]
              },
              as: 'dd',
              in: {
                $dateAdd: {
                  startDate: '$startDate',
                  unit: params.unit,
                  amount: '$$dd'
                }
              }
            }
          }
        }
      },
      {
        $unwind: '$date'
      },
      {
        $project: {
          equipmentId: '$equipmentId',
          date: '$date',
          value: {
            $cond: {
              if: {
                $eq: ['$date', '$dateTrunc']
              },
              then: '$value',
              else: 0
            }
          }
        }
      },
      {
        $group: {
          _id: '$date',
          avg: {
            $avg: '$value'
          }
        }
      },
      {
        $sort: {
          '_id': 1
        }
      }
    ]
    ).toArray()

    return results.map((result) => new SensorAverage(result._id, result.avg))
  }

  async getEquipments(): Promise<string[]> {
    const database = await this.connect()
    const collection = database.collection(SENSOR_COLLECTION)
    const results = await collection.aggregate([
      {
        $group: {
          _id: '$equipmentId'
        }
      }
    ]).toArray()

    return results.map(({ _id }) => _id)

  }
}
