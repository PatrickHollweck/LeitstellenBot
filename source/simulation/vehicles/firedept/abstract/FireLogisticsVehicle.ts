import { FireEngine } from "./FireEngine";
import { Station } from "../../../Station";

export class FireLogisticsVehicle extends FireEngine {
  constructor(station: Station) {
    super(station);
  }
}
