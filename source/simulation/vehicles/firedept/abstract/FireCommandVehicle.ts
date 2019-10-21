import { FireEngine } from "./FireEngine";
import { Station } from "../../../Station";

export class FireCommandVehicle extends FireEngine {
  constructor(station: Station) {
    super(station);
  }
}
