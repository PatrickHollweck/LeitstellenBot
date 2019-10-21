import { TankEngine } from "./abstract/TankEngine";
import { Station } from "../../Station";

export class TLF4000 extends TankEngine {
  constructor(station: Station) {
    super(station, 4000);
  }
}
