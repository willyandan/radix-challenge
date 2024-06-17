import { inject, injectable } from 'inversify'
import { Sensor } from '../models/Sensor'
import { useCase } from '../../decorators/useCase'
import { ISensorRepository, ISensorRepositorySymbol } from '../repositories/ISensorRepository'

@injectable()
@useCase
export class RegisSensorBatch {

  @inject(ISensorRepositorySymbol)
  private sensorRepo!: ISensorRepository

  async execute(sensors: Array<Sensor>) {
    await this.sensorRepo.createMany(sensors)
  }
}
