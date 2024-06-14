import { IRoute } from '../IRoute'
import { HealthRouteRequest } from './HealthRouteRequest'
import { HealthRouteResponse } from './HealthRouteResponse'
import { RouteDecorators } from '../RouteDecorators'

export class HealthRoute implements IRoute {

  @RouteDecorators.path('/health', HealthRouteRequest, HealthRouteResponse)
  get(): HealthRouteResponse {
    return new HealthRouteResponse()
  }


}
