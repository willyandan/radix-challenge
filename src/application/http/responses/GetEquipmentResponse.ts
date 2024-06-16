import { HttpStatusEnum } from '../HttpStatusEnum'
import { IResponse } from './IResponse'

export class GetEquipmentResponse implements IResponse {
  statusCode: HttpStatusEnum = HttpStatusEnum.OK

  constructor(
    public equipments: Array<string>
  ) { }

}
