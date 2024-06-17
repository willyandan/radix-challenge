import { GetEquipmentByTimeParams } from './params/GetEquipmentByTimeParams'
import { Sensor } from '../models/Sensor'
import { EquipmentAvgOverTime } from '../models/EquipmentAvgOverTime'
import { EquipmentStandardDeviation } from '../models/EquipmentStandardDeviation'
import { GetEquipmentStandardDeviationParams } from './params/GetEquipmentStandardDeviationParams'
import { GetSensorAvgParams } from './params/GetSensorAvgParams'
import { SensorAverage } from '../models/SensorAverage'

export const ISensorRepositorySymbol = Symbol('ISensorRepository')
export interface ISensorRepository {
  create(sensor: Sensor): Promise<void>
  createMany(sensor: Array<Sensor>): Promise<void>
  getEquipmentAvgByTime(params: GetEquipmentByTimeParams): Promise<Array<EquipmentAvgOverTime>>
  getEquipmentStdDev(params: GetEquipmentStandardDeviationParams): Promise<Array<EquipmentStandardDeviation>>
  getSensorAvg(params: GetSensorAvgParams): Promise<Array<SensorAverage>>
  getEquipments(): Promise<Array<string>>
}
