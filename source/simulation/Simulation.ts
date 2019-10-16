import { Station } from "./Station";
import { Emergency } from "./emergencies/Emergency";

export class Simulation {
  public stations: Station[];
  public emergencies: Emergency[];

  constructor() {
    this.stations = [];
    this.emergencies = [];
  }

  simulate() {
    this.dispatchVehicles();
  }

  dispatchVehicles() {
    return;
  }
}
