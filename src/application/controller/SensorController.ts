import { inject, injectable } from 'inversify'
import { TYPES } from '../../infra/container/types'
import { RegisterSensor } from '../../domain/useCases/RegisterSensor'
import { route, request, HttpMethods } from '../../decorators/route'
import { CreateSensorRequest } from '../http/requests/CreateSensorRequest'
import { CreateSensorResponse } from '../http/responses/CreateSensorResponse'

@injectable()
export class SensorController {

  @inject(TYPES.useCases.RegisterSensor)
  private registerSensorUseCase!: RegisterSensor

  @route(HttpMethods.POST, '/sensor')
  @request(CreateSensorRequest)
  createSensor(request: CreateSensorRequest) {
    this.registerSensorUseCase.execute(request.toSensor())
    return new CreateSensorResponse()
  }
}
