import { inject, injectable } from 'inversify'
import { controller } from '../../decorators/controller'
import { HttpMethods, RequestMapper, route, request } from '../../decorators/route'
import { GetEquipmentAvgOverTimeRequest } from '../http/requests/GetEquipmentAvgOverTimeRequest'
import { GetEquipmentAvgOverTimeResponse } from '../http/responses/GetEquipmentAvgOverTimeResponse'
import { GetEquipmentOverTime } from '../../domain/useCases/GetEquipmentOverTime'

@injectable()
@controller
export class SensorChartController {

  @inject(GetEquipmentOverTime)
  private getEquipmentAvgOverTimeUseCase!: GetEquipmentOverTime


  @route(HttpMethods.GET, '/sensor/chart/equipment-avg-time')
  @request(GetEquipmentAvgOverTimeRequest, [RequestMapper.QUERY])
  async getEquipmentAvgOverTime(request: GetEquipmentAvgOverTimeRequest) {
    const result = await this.getEquipmentAvgOverTimeUseCase.execute(request)
    return new GetEquipmentAvgOverTimeResponse(result)
  }
}
