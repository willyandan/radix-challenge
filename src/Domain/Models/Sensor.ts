export class Sensor {
  constructor(
    public equipmentId: string,
    public timestamp: Date,
    public value: number
  ) { }
}
