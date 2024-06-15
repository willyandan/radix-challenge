import { inject, injectable } from 'inversify'
import { useCase } from '../../decorators/useCase'
import { SensorAverageByTimeParams } from '../models/SensorAverageByTimeParams'
import { ISensorRepository, ISensorRepositorySymbol } from '../repositories/ISensorRepository'

@injectable()
@useCase
export class GetSensorAverageByTime {

  @inject(ISensorRepositorySymbol)
  private sensorRepo!: ISensorRepository

  async execute(params: SensorAverageByTimeParams) {
    const result = await this.sensorRepo.getAverageByTime(params)
    return result
  }
}
