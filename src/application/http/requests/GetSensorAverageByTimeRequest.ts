import { Expose, Type } from 'class-transformer'
import { IsEnum, IsPositive } from 'class-validator'
import { SensorAverageByTimeUnit } from '../../../domain/models/SensorAverageByTimeParams'



export class GetSensorAverageByTimeRequest {
  @Expose({})
  @IsEnum(SensorAverageByTimeUnit)
  public unit: SensorAverageByTimeUnit = SensorAverageByTimeUnit.Day

  @Expose()
  @Type(() => Number)
  @IsPositive()
  public limit: number = 10
}
