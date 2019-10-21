import { HoseEngine } from "./abstract/HoseEngine";
import { Station } from "../../Station";

export class MLF extends HoseEngine {
  constructor(station: Station) {
    super(station, 1000);
  }
}
