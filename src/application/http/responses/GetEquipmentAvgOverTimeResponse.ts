import { EquipmentAvgOverTime } from '../../../domain/models/EquipmentAvgOverTime'
import { HttpStatusEnum } from '../HttpStatusEnum'
import { IResponse } from './IResponse'

export class GetEquipmentAvgOverTimeResponse implements IResponse {
  statusCode: HttpStatusEnum = HttpStatusEnum.OK
  data: Array<EquipmentAvgOverTime>

  constructor(sensors: Array<EquipmentAvgOverTime>) {
    this.data = sensors
  }
}
