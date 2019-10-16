import { Station } from "../../Station";
import { HoseEngine } from "./HoseEngine";

export class LF20 extends HoseEngine {
  constructor(station: Station) {
    super(station, 2000);
  }
}
