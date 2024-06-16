import { Sensor } from '../models/Sensor'
import { SensorAverageByTime } from '../models/SensorAverageByTime'
import { SensorAverageByTimeParams } from '../models/SensorAverageByTimeParams'

export const ISensorRepositorySymbol = Symbol('ISensorRepository')
export interface ISensorRepository {
  create(sensor: Sensor): Promise<void>
  createMany(sensor: Array<Sensor>): Promise<void>
  getAverageByTime(params: SensorAverageByTimeParams): Promise<Array<SensorAverageByTime>>
}
