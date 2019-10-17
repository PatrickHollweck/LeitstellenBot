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
        console.log("No dispatch needed for ", emergency.description());
        return;
      }

      this.dispatchVehicles(emergency);
    });

    console.log("-- TICK END");
  }

  dispatchVehicles(emergency: Emergency) {
    for (let index = 0; index < emergency.requiredVehicles.length; index++) {
      const requirement = emergency.requiredVehicles[index];
      const vehicles = this.findAvailableMatchingVehicles(requirement);

      if (vehicles.length === 0) {
        console.log(
          "No available or matching Vehicles found for",
          emergency.description()
        );

        break;
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
          "to a",
          emergency.description()
        );
      });
    }
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
