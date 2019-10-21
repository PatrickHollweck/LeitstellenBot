import { Emergency } from "./Emergency";

import { VehicleRequirement } from "./VehicleRequirement";

import { HoseEngine } from "../vehicles/firedept/abstract/HoseEngine";
import { FireLadder } from "../vehicles/firedept/abstract/FireLadder";

export class HouseFire extends Emergency {
  constructor(location?: string) {
    super(
      [
        new VehicleRequirement(HoseEngine, 2),
        new VehicleRequirement(FireLadder, 1)
      ],
      location
    );
  }
}
