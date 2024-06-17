import { Expose, Type } from 'class-transformer'
import { IRequest } from './IRequest'
import { IsDate, IsNumber, IsString } from 'class-validator'
import { Sensor } from '../../../domain/models/Sensor'

export class CreateSensorRequest implements IRequest {
  @Expose()
  @IsString() equipmentId!: string

  @Expose()
  @Type(() => Date)
  @IsDate() timestamp!: Date

  @Expose()
  @IsNumber() value!: number

  toSensor(): Sensor {
    return new Sensor(this.equipmentId, this.timestamp, this.value)
  }
}
