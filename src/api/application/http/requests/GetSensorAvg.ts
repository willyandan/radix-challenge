import { Expose, Type } from 'class-transformer'
import { TimeUnit } from '../../../domain/models/TimeUnit'
import { IsDate, IsEnum } from 'class-validator'

export class GetSensorAvg {
  @Expose()
  @IsEnum(TimeUnit)
  public unit: TimeUnit = TimeUnit.Day

  @Expose()
  @Type(() => Date)
  @IsDate()
  public date: Date = new Date()
}
