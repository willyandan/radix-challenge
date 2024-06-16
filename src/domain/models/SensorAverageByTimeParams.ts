export enum SensorAverageByTimeUnit {
  Year = 'year',
  Quarter = 'quarter',
  Week = 'week',
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute'
}

export class SensorAverageByTimeParams {
  constructor(
    public unit: SensorAverageByTimeUnit,
    public limit: number
  ) { }

}
