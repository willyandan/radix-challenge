import { inject, injectable } from 'inversify'
import { RegisterSensor } from '../../domain/useCases/RegisterSensor'
import { route, request, HttpMethods, RequestMapper } from '../../decorators/route'
import { CreateSensorRequest } from '../http/requests/CreateSensorRequest'
import { CreateSensorResponse } from '../http/responses/CreateSensorResponse'
import { controller } from '../../decorators/controller'
import { CreateSensorBatchRequest } from '../http/requests/CreateSensorBatchRequest'
import { createReadStream } from 'fs'
import { Transform } from 'stream'
import { deserialize, serialize } from 'v8'
import { plainToInstance } from 'class-transformer'
import { Sensor } from '../../domain/models/Sensor'
import { validate } from 'class-validator'
import { RegisSensorBatch } from '../../domain/useCases/RegisterSensorBatch'

@injectable()
@controller
export class SensorController {

  @inject(RegisterSensor)
  private registerSensorUseCase!: RegisterSensor

  @inject(RegisSensorBatch)
  private registerSensorBatchUseCase!: RegisSensorBatch

  @route(HttpMethods.POST, '/sensor')
  @request(CreateSensorRequest)
  async createSensor(request: CreateSensorRequest) {

    await this.registerSensorUseCase.execute(request.toSensor())
    return new CreateSensorResponse()
  }

  private readCsvChunks(): Transform {
    let lastLine: string | undefined
    return new Transform({
      readableObjectMode: true,
      transform(chunk: Buffer, encoding, callback) {
        const chunkString = chunk.toString()
        const [firstLine, ...chunkLines] = chunkString.split('\n')
        const lines = [`${lastLine || ''}${firstLine}`, ...chunkLines]
        if (chunkString[chunkString.length - 1] != '\n') {
          lastLine = lines[lines.length - 1]
          lines.pop()
        } else {
          lastLine = undefined
        }
        this.push(lines.join('\n'))
        callback()
      },
      final(callback) {
        if (lastLine) {
          this.push(lastLine)
        }
        callback()
      }
    })
  }

  private transformCsvToObject(): Transform {
    let headLine: Array<string>
    return new Transform({
      readableObjectMode: true,
      transform(chunk: Buffer, encoding, callback) {
        const chunkLines = chunk.toString().split('\n')
        if (!headLine) {
          headLine = chunkLines.shift()?.split(',') || []
        }
        const json = chunkLines.map(line => {
          const elements = line.split(',')
          return headLine.reduce((obj, head, i) => {
            return {
              ...obj,
              [head]: elements[i] || ''
            }
          }, {})
        })

        this.push(serialize(json))
        callback()
      }
    })
  }

  @route(HttpMethods.POST, '/sensor/batch')
  @request(CreateSensorBatchRequest, [RequestMapper.BODY, RequestMapper.FILE])
  createSensorBatch(request: CreateSensorBatchRequest) {
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(request.file.path)
      readStream
        .pipe(this.readCsvChunks())
        .pipe(this.transformCsvToObject())
        .on('data', async (chunk: Buffer) => {
          const json: Array<Record<string, string>> = deserialize(chunk)
          const sensors = plainToInstance(Sensor, json, { excludeExtraneousValues: true })
          const errors = await validate(sensors)
          if (errors.length) {
            console.log(errors)
            reject(new Error())
          }
          this.registerSensorBatchUseCase.execute(sensors)
        })
        .on('finish', () => {
          resolve(new CreateSensorResponse())
        })
    })
  }
}
