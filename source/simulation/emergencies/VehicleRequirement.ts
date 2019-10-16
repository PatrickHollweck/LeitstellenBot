export class VehicleRequirement {
  public readonly type: Function;
  public readonly count: number;

  constructor(type: Function, count: number) {
    this.type = type;
    this.count = count;
  }
}
