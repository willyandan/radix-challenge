import 'reflect-metadata'
import { Server } from './server'
import { env } from './env'

const server = new Server(Number(env('PORT') || 8080), env('HOST'))
server.start()
