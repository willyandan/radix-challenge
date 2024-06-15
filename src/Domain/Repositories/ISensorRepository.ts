import { Sensor } from '../models/Sensor'

export const ISensorRepositorySymbol = Symbol('ISensorRepository')
export interface ISensorRepository {
  create(sensor: Sensor): Promise<void>
}
