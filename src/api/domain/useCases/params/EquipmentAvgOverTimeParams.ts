import { TimeUnit } from '../../models/TimeUnit'

export class EquipmentAvgOverTimeParams {
  constructor(
    public unit: TimeUnit,
    public date: Date,
    public equipments: Array<string>
  ) { }

}
