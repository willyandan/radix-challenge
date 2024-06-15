import { IRequest } from './IRequest'
import { IResponse } from './IResponse'

export interface IRoute {
    get?(request: IRequest): Promise<IResponse>
    post?(request: IRequest): Promise<IResponse>
    put?(request: IRequest): Promise<IResponse>
    delete?(request: IRequest): Promise<IResponse>
    patch?(request: IRequest): Promise<IResponse>
}
