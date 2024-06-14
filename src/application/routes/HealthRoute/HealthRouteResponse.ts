import { HttpStatusEnum } from '../HttpStatusEnum'
import { IResponse } from '../IResponse'

export class HealthRouteResponse implements IResponse {
  statusCode = HttpStatusEnum.OK
}
