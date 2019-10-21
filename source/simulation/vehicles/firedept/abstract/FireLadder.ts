import { Station } from "../../../Station";
import { FireEngine } from "./FireEngine";

export class FireLadder extends FireEngine {
  constructor(station: Station) {
    super(station);
  }
}
