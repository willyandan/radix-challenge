import { inject, injectable } from 'inversify'
import { useCase } from '../../decorators/useCase'
import { EquipmentAvgOverTimeParams, TimeUnit } from '../models/EquipmentAvgOverTimeParams'
import { ISensorRepository, ISensorRepositorySymbol } from '../repositories/ISensorRepository'
import { GetEquipmentByTimeParams } from '../models/GetEquipmentByTimeParams'
import { unitToMs } from '../utils/unitToMs'

@injectable()
@useCase
export class GetEquipmentOverTime {

  @inject(ISensorRepositorySymbol)
  private sensorRepo!: ISensorRepository

  async execute(params: EquipmentAvgOverTimeParams) {

    const unitOrder = [TimeUnit.Minute, TimeUnit.Hour, TimeUnit.Day, TimeUnit.Week, TimeUnit.Month, TimeUnit.Quarter, TimeUnit.Year, TimeUnit.Year]
    const nextUnitIndex = unitOrder.findIndex((unit) => unit === params.unit) + 1
    const msSpam = unitToMs(unitOrder[nextUnitIndex]) * (params.unit === TimeUnit.Year ? 1 : 10)
    const startDateMs = params.date.getTime() - msSpam
    const startDate = new Date(startDateMs)

    const result = await this.sensorRepo.getEquipmentAvgByTime(
      new GetEquipmentByTimeParams(params.unit, startDate, params.date, params.equipments)
    )
    return result
  }
}
