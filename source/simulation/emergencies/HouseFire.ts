import { Emergency } from "./Emergency";

import { VehicleRequirement } from "./VehicleRequirement";

import { HoseEngine } from "../vehicles/firedept/HoseEngine";
import { FireLadder } from "../vehicles/firedept/FireLadder";

export class HouseFire extends Emergency {
  constructor() {
    super([
      new VehicleRequirement(HoseEngine, 2),
      new VehicleRequirement(FireLadder, 1)
    ]);
  }
}
