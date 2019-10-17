import { VehicleRequirement } from "./VehicleRequirement";
import { EmergencyVehicle } from "../vehicles/EmergencyVehicle";

export abstract class Emergency {
  public requiredVehicles: VehicleRequirement[];
  public dispatchedVehicles: EmergencyVehicle[];

  constructor(requiredVehicles: VehicleRequirement[]) {
    this.dispatchedVehicles = [];
    this.requiredVehicles = requiredVehicles;
  }

  enroute(vehicle: EmergencyVehicle) {
    this.dispatchedVehicles.push(vehicle);
  }

  needs(vehicle: EmergencyVehicle | Function) {
    for (let index = 0; index < this.requiredVehicles.length; index++) {
      const requirement = this.requiredVehicles[index];

      if (!requirement.typeMatches(vehicle)) {
        continue;
      }

      const dispatchedOfRequirement = this.dispatchedVehicles.filter(
        dispatched => requirement.typeMatches(dispatched)
      );

      if (dispatchedOfRequirement.length !== requirement.count) {
        return true;
      }
    }

    return false;
  }

  needsFurtherVehicles(): boolean {
    for (let index = 0; index < this.requiredVehicles.length; index++) {
      const requirement = this.requiredVehicles[index];

      if (this.needs(requirement.type)) {
        return true;
      }
    }

    return false;
  }
}
