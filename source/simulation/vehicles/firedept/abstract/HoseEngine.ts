import { Station } from "../../../Station";
import { FireEngine } from "./FireEngine";

export abstract class HoseEngine extends FireEngine {
  public waterTankCapacity: number;

  constructor(station: Station, waterTankCapacity: number) {
    super(station);

    this.waterTankCapacity = waterTankCapacity;
  }
}
