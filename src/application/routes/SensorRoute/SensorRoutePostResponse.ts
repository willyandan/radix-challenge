import { HttpStatusEnum } from '../HttpStatusEnum'
import { IResponse } from '../IResponse'

export class SensorRoutePostResponse implements IResponse {
  statusCode = HttpStatusEnum.CREATED
}
