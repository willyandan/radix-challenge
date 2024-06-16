import { inject, injectable } from 'inversify'
import { useCase } from '../../decorators/useCase'
import { EquipmentAvgOverTimeParams } from '../models/EquipmentAvgOverTimeParams'
import { ISensorRepository, ISensorRepositorySymbol } from '../repositories/ISensorRepository'
import { GetEquipmentByTimeParams } from '../models/GetEquipmentByTimeParams'
import { calculateStartDate } from '../utils/calculateStartDate'

@injectable()
@useCase
export class GetEquipmentOverTime {

  @inject(ISensorRepositorySymbol)
  private sensorRepo!: ISensorRepository

  async execute(params: EquipmentAvgOverTimeParams) {

    const startDate = calculateStartDate(params.unit, params.date)
    const result = await this.sensorRepo.getEquipmentAvgByTime(
      new GetEquipmentByTimeParams(params.unit, startDate, params.date, params.equipments)
    )
    return result
  }
}
