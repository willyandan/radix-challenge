export class SensorAverageByTime {
  constructor(
    public timestamp: Date,
    public equipments: Array<{ equipmentId: string, average: number }>
  ) { }
}
