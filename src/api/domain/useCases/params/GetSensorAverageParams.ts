import { TimeUnit } from '../../models/TimeUnit'

export class GetSensorAverageParams {
  constructor(
    public unit: TimeUnit,
    public date: Date
  ) { }
}
