import { VehicleRequirement } from "./VehicleRequirement";
import { EmergencyVehicle } from "../vehicles/EmergencyVehicle";

export abstract class Emergency {
  public requiredVehicles: VehicleRequirement[];
  public dispatchedVehicles: EmergencyVehicle[];

  constructor(requiredVehicles: VehicleRequirement[]) {
    this.dispatchedVehicles = [];
    this.requiredVehicles = requiredVehicles;
  }
}
