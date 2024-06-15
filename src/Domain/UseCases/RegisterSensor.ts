
import { inject, injectable } from 'inversify'
import { Sensor } from '../Models/Sensor'
import { ISensorRepository } from '../Repositories/ISensorRepository'
import { TYPES } from '../../infra/container/types'

@injectable()
export class RegisterSensor {

  @inject(TYPES.repositories.ISensorRepository)
  private sensorRepo!: ISensorRepository

  async execute(sensorData: Sensor) {
    const sensor = await this.sensorRepo.create(sensorData)
    return sensor
  }
}
