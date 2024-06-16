import { TimeUnit } from '../../models/TimeUnit'

export class EquipmentStandardDeviationParams {
  constructor(
    public unit: TimeUnit,
    public date: Date
  ) { }
}
