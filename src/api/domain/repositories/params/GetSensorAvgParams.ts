import { TimeUnit } from '../../models/TimeUnit'

export class GetSensorAvgParams {
  constructor(
    public startDate: Date,
    public endDate: Date,
    public unit: TimeUnit
  ) { }
}
