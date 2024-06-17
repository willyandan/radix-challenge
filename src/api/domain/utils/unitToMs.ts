import { TimeUnit } from '../models/TimeUnit'

export const unitToMs = (unit: TimeUnit) => {
  const table: Record<TimeUnit, number> = {
    minute: 60000,
    hour: 3.6e+6,
    day: 8.64e+7,
    week: 6.048e+8,
    month: 2.628e+9,
    quarter: 5.256e+9,
    year: 3.162e+10
  }
  return table[unit]
}
