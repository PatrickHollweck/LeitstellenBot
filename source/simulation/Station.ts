import { EmergencyVehicle } from "./vehicles/EmergencyVehicle";

export class Station {
  public name: string;
  public vehicles: EmergencyVehicle[];

  constructor(name: string, vehicles?: EmergencyVehicle[]) {
    this.name = name;
    this.vehicles = vehicles || [];
  }
}
