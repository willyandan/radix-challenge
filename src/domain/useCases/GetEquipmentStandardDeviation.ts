import { inject, injectable } from 'inversify'
import { useCase } from '../../decorators/useCase'
import { EquipmentStandardDeviationParams } from './params/EquipmentStandardDeviationParams'
import { ISensorRepository, ISensorRepositorySymbol } from '../repositories/ISensorRepository'
import { calculateStartDate } from '../utils/calculateStartDate'
import { GetEquipmentStandardDeviationParams } from '../repositories/params/GetEquipmentStandardDeviationParams'

@injectable()
@useCase
export class GetEquipmentStandardDeviation {

  @inject(ISensorRepositorySymbol)
  private sensorRepo!: ISensorRepository

  execute(params: EquipmentStandardDeviationParams) {

    const threshold = 90
    const startDate = calculateStartDate(params.unit, params.date)
    return this.sensorRepo.getEquipmentStdDev(new GetEquipmentStandardDeviationParams(startDate, params.date, threshold))
  }
}
