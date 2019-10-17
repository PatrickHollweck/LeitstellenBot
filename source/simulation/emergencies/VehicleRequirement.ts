export class VehicleRequirement {
  public readonly type: Function;
  public readonly count: number;

  constructor(type: Function, count: number) {
    this.type = type;
    this.count = count;
  }

  typeMatches(type: Function | Object) {
    if (typeof type === "object") {
      return type instanceof this.type;
    }

    if (typeof type === "function") {
      return type === this.type;
    }

    throw new Error("Cannot compare vehicle type which is " + typeof type);
  }
}
