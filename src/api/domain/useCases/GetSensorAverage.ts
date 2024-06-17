import { inject, injectable } from 'inversify'
import { ISensorRepository, ISensorRepositorySymbol } from '../repositories/ISensorRepository'
import { GetSensorAverageParams } from './params/GetSensorAverageParams'
import { GetSensorAvgParams } from '../repositories/params/GetSensorAvgParams'
import { calculateStartDate } from '../utils/calculateStartDate'
import { useCase } from '../../decorators/useCase'

@injectable()
@useCase
export class GetSensorAverage {

  @inject(ISensorRepositorySymbol)
  private sensorRepo!: ISensorRepository

  execute(param: GetSensorAverageParams) {
    const startDate = calculateStartDate(param.unit, param.date)
    return this.sensorRepo.getSensorAvg(new GetSensorAvgParams(startDate, param.date, param.unit))
  }
}
