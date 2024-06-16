export enum TimeUnit {
  Year = 'year',
  Quarter = 'quarter',
  Week = 'week',
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute'
}

export class EquipmentAvgOverTimeParams {
  constructor(
    public unit: TimeUnit,
    public date: Date,
    public equipments: Array<string>
  ) { }

}
