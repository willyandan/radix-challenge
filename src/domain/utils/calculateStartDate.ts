import { TimeUnit } from '../models/TimeUnit'
import { unitToMs } from './unitToMs'

export const calculateStartDate = (unit: TimeUnit, date: Date) => {
  const unitOrder = [TimeUnit.Minute, TimeUnit.Hour, TimeUnit.Day, TimeUnit.Week, TimeUnit.Month, TimeUnit.Quarter, TimeUnit.Year, TimeUnit.Year]
  const nextUnitIndex = unitOrder.findIndex((val) => unit === val) + 1

  const msSpam = unitToMs(unitOrder[nextUnitIndex]) * (unit === TimeUnit.Year ? 10 : 1)

  const startDateMs = date.getTime() - msSpam
  return new Date(startDateMs)
}
