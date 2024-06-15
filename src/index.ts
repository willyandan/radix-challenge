import 'reflect-metadata'
import { Server } from './server'
import { env } from './env'
import { Container } from './infra/container'

const container = new Container
container.loadBinds()

const server = new Server(container, Number(env('PORT') || 8080), env('HOST'))
server.start()
