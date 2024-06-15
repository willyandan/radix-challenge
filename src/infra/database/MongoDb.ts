import { MongoClient } from 'mongodb'
import { env } from '../../env'
import { injectable } from 'inversify'

@injectable()
export class MongoDb {
  private client: MongoClient
  constructor() {
    const url = env('MONGODB_URL') || ''
    console.log({ url })
    this.client = new MongoClient(url, { appName: env('APP_NAME') })
  }
  async connect(db: string) {
    const connection = await this.client.connect()
    return connection.db(db)
  }
}
