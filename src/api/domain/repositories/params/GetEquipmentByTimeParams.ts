import { TimeUnit } from '../../models/TimeUnit'

export class GetEquipmentByTimeParams {
  constructor(
    public unit: TimeUnit,
    public startDate: Date,
    public endDate: Date,
    public equipments: Array<string>
  ) { }
}
