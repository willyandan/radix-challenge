import { GetEquipmentByTimeParams } from '../models/GetEquipmentByTimeParams'
import { Sensor } from '../models/Sensor'
import { EquipmentAvgOverTime } from '../models/EquipmentAvgOverTime'

export const ISensorRepositorySymbol = Symbol('ISensorRepository')
export interface ISensorRepository {
  create(sensor: Sensor): Promise<void>
  createMany(sensor: Array<Sensor>): Promise<void>
  getEquipmentAvgByTime(params: GetEquipmentByTimeParams): Promise<Array<EquipmentAvgOverTime>>
}
