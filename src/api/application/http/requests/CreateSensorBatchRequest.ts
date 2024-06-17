import { Expose, Type } from 'class-transformer'
import { IsString } from 'class-validator'

export class CreateSensorBatchFile {
  @Expose()
  @IsString()
  public path!: string
}

export class CreateSensorBatchRequest {

  @Expose()
  @Type(() => CreateSensorBatchFile)
  public file!: CreateSensorBatchFile
}
