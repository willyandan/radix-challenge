import { Expose, Type } from 'class-transformer'
import { IsDate, IsEnum } from 'class-validator'
import { TimeUnit } from '../../../domain/models/TimeUnit'

export class EquipmentStandardDeviationRequest {
  @Expose()
  @IsEnum(TimeUnit)
  public unit: TimeUnit = TimeUnit.Day

  @Expose()
  @Type(() => Date)
  @IsDate()
  public date: Date = new Date()
}
