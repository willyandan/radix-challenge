import { inject, injectable } from 'inversify'
import { RegisterSensor } from '../../../Domain/UseCases/RegisterSensor'
import { IRoute } from '../IRoute'
import { RouteDecorators } from '../RouteDecorators'
import { SensorRoutePostRequest } from './SensorRoutePostRequest'
import { SensorRoutePostResponse } from './SensorRoutePostResponse'
import { TYPES } from '../../../infra/container/types'

@injectable()
export class SensorRoute implements IRoute {

  @inject(TYPES.useCases.RegisterSensor)
  private registerSensorUseCase!: RegisterSensor

  @RouteDecorators.path('/sensor', SensorRoutePostRequest, SensorRoutePostResponse)
  async post(request: SensorRoutePostRequest): Promise<SensorRoutePostResponse> {

    this.registerSensorUseCase.execute(request.toSensor())
    return new SensorRoutePostResponse()
  }

}
