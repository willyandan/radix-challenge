import { IRequest } from './IRequest'
import { IResponse } from './IResponse'

export interface IRoute {
    get?(request: IRequest): IResponse
    post?(request: IRequest): IResponse
    put?(request: IRequest): IResponse
    delete?(request: IRequest): IResponse
    patch?(request: IRequest): IResponse
}
