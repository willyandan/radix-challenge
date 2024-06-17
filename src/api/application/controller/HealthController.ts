import { injectable } from 'inversify'
import { HttpMethods, route } from '../../decorators/route'
import { GetHealthStatusResponse } from '../http/responses/GetHealthStatusResponse'
import { IController } from './IController'
import { controller } from '../../decorators/controller'

@injectable()
@controller
export class HealthController implements IController {

  @route(HttpMethods.GET, '/health')
  async getHealthStatus() {

    return new GetHealthStatusResponse()
  }
}
