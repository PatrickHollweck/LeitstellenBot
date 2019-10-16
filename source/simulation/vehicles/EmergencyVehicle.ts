import { Station } from "../Station";

export enum VehicleState {
  Idle,
  Enroute,
  OnScene
}

export abstract class EmergencyVehicle {
  public state: VehicleState;
  public station: Station;

  constructor(station: Station) {
    this.station = station;
    this.state = VehicleState.Idle;
  }
}
