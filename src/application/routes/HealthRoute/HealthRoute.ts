import { IRoute } from '../IRoute'
import { HealthRouteRequest } from './HealthRouteRequest'
import { HealthRouteResponse } from './HealthRouteResponse'
import { RouteDecorators } from '../RouteDecorators'
import { injectable } from 'inversify'

@injectable()
export class HealthRoute implements IRoute {

  @RouteDecorators.path('/health', HealthRouteRequest, HealthRouteResponse)
  async get(): Promise<HealthRouteResponse> {
    return new HealthRouteResponse()
  }


}
