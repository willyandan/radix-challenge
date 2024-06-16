import { GetEquipmentByTimeParams } from '../models/GetEquipmentByTimeParams'
import { Sensor } from '../models/Sensor'
import { EquipmentAvgOverTime } from '../models/EquipmentAvgOverTime'
import { EquipmentStandardDeviation } from '../models/EquipmentStandardDeviation'
import { GetEquipmentStandardDeviationParams } from '../models/GetEquipmentStandardDeviationParams'

export const ISensorRepositorySymbol = Symbol('ISensorRepository')
export interface ISensorRepository {
  create(sensor: Sensor): Promise<void>
  createMany(sensor: Array<Sensor>): Promise<void>
  getEquipmentAvgByTime(params: GetEquipmentByTimeParams): Promise<Array<EquipmentAvgOverTime>>
  getEquipmentStdDev(params: GetEquipmentStandardDeviationParams): Promise<Array<EquipmentStandardDeviation>>
}
