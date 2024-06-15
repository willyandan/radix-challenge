import { Sensor } from '../models/Sensor'

export interface ISensorRepository {
  create(sensor: Sensor): Promise<void>
}
