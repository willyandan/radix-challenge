import { EquipmentStandardDeviation } from '../../../domain/models/EquipmentStandardDeviation'
import { HttpStatusEnum } from '../HttpStatusEnum'
import { IResponse } from './IResponse'

export class GetEquipmentStandardDeviationResponse implements IResponse {
  statusCode: HttpStatusEnum = HttpStatusEnum.OK
  data: Array<EquipmentStandardDeviation>

  constructor(equipments: Array<EquipmentStandardDeviation>) {
    this.data = equipments
  }
}
