export class GetEquipmentStandardDeviationParams {
  constructor(
    public startDate: Date,
    public endDate: Date,
    public threshold: number
  ) { }
}
