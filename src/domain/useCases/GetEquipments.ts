import { inject, injectable } from 'inversify'
import { useCase } from '../../decorators/useCase'
import { ISensorRepository, ISensorRepositorySymbol } from '../repositories/ISensorRepository'

@injectable()
@useCase
export class GetEquipments {
  @inject(ISensorRepositorySymbol)
  private sensorRepo!: ISensorRepository

  execute() {
    return this.sensorRepo.getEquipments()
  }
}
