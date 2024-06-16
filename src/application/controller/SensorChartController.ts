import { inject, injectable } from 'inversify'
import { controller } from '../../decorators/controller'
import { HttpMethods, RequestMapper, route, request } from '../../decorators/route'
import { GetEquipmentAvgOverTimeRequest } from '../http/requests/GetEquipmentAvgOverTimeRequest'
import { GetEquipmentAvgOverTimeResponse } from '../http/responses/GetEquipmentAvgOverTimeResponse'
import { GetEquipmentOverTime } from '../../domain/useCases/GetEquipmentOverTime'
import { EquipmentStandardDeviationRequest } from '../http/requests/EquipmentStandardDeviationRequest'
import { GetEquipmentStandardDeviation } from '../../domain/useCases/GetEquipmentStandardDeviation'
import { GetEquipmentStandardDeviationResponse } from '../http/responses/GetEquipmentStandardDeviation'
import { GetSensorAvg } from '../http/requests/GetSensorAvg'
import { GetSensorAverage } from '../../domain/useCases/GetSensorAverage'
import { GetSensorAvgResponse } from '../http/responses/GetSensorAvgResponse'

@injectable()
@controller
export class SensorChartController {

  @inject(GetEquipmentOverTime)
  private getEquipmentAvgOverTimeUseCase!: GetEquipmentOverTime

  @inject(GetEquipmentStandardDeviation)
  private getEquipmentStdDevUseCase!: GetEquipmentStandardDeviation

  @inject(GetSensorAverage)
  private getSensorAverageUseCase!: GetSensorAverage


  @route(HttpMethods.GET, '/sensor/chart/equipment-avg-time')
  @request(GetEquipmentAvgOverTimeRequest, [RequestMapper.QUERY])
  async getEquipmentAvgOverTime(request: GetEquipmentAvgOverTimeRequest) {
    const result = await this.getEquipmentAvgOverTimeUseCase.execute(request)
    return new GetEquipmentAvgOverTimeResponse(result)
  }

  @route(HttpMethods.GET, '/sensor/chart/equipment-std-dev')
  @request(EquipmentStandardDeviationRequest, [RequestMapper.QUERY])
  async getEquipmentStandardDeviation(request: EquipmentStandardDeviationRequest) {
    const result = await this.getEquipmentStdDevUseCase.execute(request)
    return new GetEquipmentStandardDeviationResponse(result)
  }

  @route(HttpMethods.GET, '/sensor/chart/sensor-avg')
  @request(GetSensorAvg, [RequestMapper.QUERY])
  async getSensorAvg(request: GetSensorAvg) {
    const result = await this.getSensorAverageUseCase.execute(request)
    return new GetSensorAvgResponse(result)
  }
}
