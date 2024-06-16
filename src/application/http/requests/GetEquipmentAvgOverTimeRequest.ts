import { Expose, Transform, Type } from 'class-transformer'
import { IsArray, IsDate, IsEnum } from 'class-validator'
import { TimeUnit } from '../../../domain/models/EquipmentAvgOverTimeParams'



export class GetEquipmentAvgOverTimeRequest {
  @Expose({})
  @IsEnum(TimeUnit)
  public unit: TimeUnit = TimeUnit.Day

  @Expose()
  @Type(() => Date)
  @IsDate()
  public date: Date = new Date()

  @Expose()
  @Type(() => Array<string>)
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsArray()
  public equipments!: Array<string>
}
