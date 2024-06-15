
import { inject, injectable } from 'inversify'
import { Sensor } from '../models/Sensor'
import { ISensorRepository, ISensorRepositorySymbol } from '../repositories/ISensorRepository'
import { useCase } from '../../decorators/useCase'

@injectable()
@useCase
export class RegisterSensor {

  @inject(ISensorRepositorySymbol)
  private sensorRepo!: ISensorRepository

  async execute(sensorData: Sensor) {
    const sensor = await this.sensorRepo.create(sensorData)
    return sensor
  }
}
