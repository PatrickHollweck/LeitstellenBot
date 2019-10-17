import { Station } from "./Station";
import { Emergency } from "./emergencies/Emergency";
import { VehicleState, EmergencyVehicle } from "./vehicles/EmergencyVehicle";
import { VehicleRequirement } from "./emergencies/VehicleRequirement";

export class Simulation {
  public stations: Station[];
  public emergencies: Emergency[];

  constructor() {
    this.stations = [];
    this.emergencies = [];
  }

  tick() {
    this.emergencies.forEach(emergency => {
      if (!emergency.needsFurtherVehicles()) {
        console.log("No dispatch needed...", emergency);
        return;
      }

      this.dispatchVehicles(emergency);
    });
  }

  dispatchVehicles(emergency: Emergency) {
    emergency.requiredVehicles.forEach(requirement => {
      const vehicles = this.findAvailableMatchingVehicles(requirement);

      if (vehicles.length === 0) {
        console.log("No matching Vehicles found...");
      }

      vehicles.forEach(vehicle => {
        if (!emergency.needsFurtherVehicles()) {
          return;
        }

        if (!emergency.needs(vehicle)) {
          return;
        }

        emergency.enroute(vehicle);

        console.log(
          "Dispatching a",
          vehicle.constructor.name,
          "from",
          vehicle.station.name,
          "to",
          emergency.constructor.name
        );
      });
    });
  }

  findAvailableMatchingVehicles(requirement: VehicleRequirement) {
    const available = new Array<EmergencyVehicle>();

    this.stations.forEach(station => {
      const matches = station.vehicles.filter(vehicle => {
        return (
          vehicle.state === VehicleState.Idle &&
          requirement.typeMatches(vehicle)
        );
      });

      available.push(...matches);
    });

    return available;
  }
}
