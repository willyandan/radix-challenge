import { Expose, Type } from 'class-transformer'
import { IsDate, IsNumber, IsString } from 'class-validator'

export class Sensor {
  @Expose()
  @IsString()
  public equipmentId!: string

  @Expose()
  @IsDate()
  @Type(() => Date)
  public timestamp!: Date

  @Expose()
  @IsNumber()
  @Type(() => Number)
  public value!: number

  constructor(equipmentId: string, timeStamp: Date, value: number) {
    this.equipmentId = equipmentId
    this.timestamp = timeStamp
    this.value = value
  }
}
