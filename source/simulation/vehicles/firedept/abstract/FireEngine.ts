import { Station } from "../../../Station";
import { EmergencyVehicle } from "../../EmergencyVehicle";

export abstract class FireEngine extends EmergencyVehicle {
  constructor(station: Station) {
    super(station);
  }
}
