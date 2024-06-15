import { HttpStatusEnum } from '../HttpStatusEnum'
import { IResponse } from './IResponse'

export class GetHealthStatusResponse implements IResponse {
  statusCode = HttpStatusEnum.OK
}
