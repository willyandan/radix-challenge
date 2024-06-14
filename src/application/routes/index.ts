import { HealthRoute } from './HealthRoute'
import { IRoute } from './IRoute'

export const getRoutes = (): Array<IRoute> => [
  new HealthRoute()
]
export { IRoute }
