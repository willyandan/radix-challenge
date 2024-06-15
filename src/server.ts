import express, { Express } from 'express'
import { Router } from './infra'
import { Container } from './infra/container'
export class Server {
  app: Express
  routes: Router
  constructor(private container: Container, private port: number, private host: string = '127.0.0.1') {
    this.app = express()
    this.routes = new Router(container)
  }

  start() {
    this.app.use(express.json())
    this.app.use(this.routes.getRoutes())
    this.app.listen(this.port, this.host, () => {
      console.log(`Server running at: http://${this.host}:${this.port}`)
    })
  }
}
