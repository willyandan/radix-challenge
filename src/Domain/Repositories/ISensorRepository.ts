import { Sensor } from '../Models/Sensor'

export interface ISensorRepository {
  create(sensor: Sensor): Promise<void>
}
