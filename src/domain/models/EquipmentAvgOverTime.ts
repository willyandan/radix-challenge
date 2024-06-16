export class EquipmentAvgOverTime {
  constructor(
    public timestamp: Date,
    public equipmentId: string,
    public average: number
  ) { }
}
