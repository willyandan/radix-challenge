import { SensorAverageByTime } from '../../../domain/models/SensorAverageByTime'
import { HttpStatusEnum } from '../HttpStatusEnum'
import { IResponse } from './IResponse'

export class GetSensorAverageByTimeResponse implements IResponse {
  statusCode: HttpStatusEnum = HttpStatusEnum.OK
  data: Array<SensorAverageByTime>

  constructor(sensors: Array<SensorAverageByTime>) {
    this.data = sensors
  }
}
