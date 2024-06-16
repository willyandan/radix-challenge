import { SensorAverage } from '../../../domain/models/SensorAverage'
import { HttpStatusEnum } from '../HttpStatusEnum'
import { IResponse } from './IResponse'

export class GetSensorAvgResponse implements IResponse {
  statusCode: HttpStatusEnum = HttpStatusEnum.OK
  constructor(public data: Array<SensorAverage>) { }
}
