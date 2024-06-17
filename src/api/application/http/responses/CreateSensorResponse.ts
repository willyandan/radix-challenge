import { HttpStatusEnum } from '../HttpStatusEnum'
import { IResponse } from './IResponse'

export class CreateSensorResponse implements IResponse {
  statusCode = HttpStatusEnum.CREATED
}
