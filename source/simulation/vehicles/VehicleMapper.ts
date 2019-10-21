import { FireLadder } from "./firedept/abstract/FireLadder";
import { LF20 } from "./firedept/LF20";
import { ELW1 } from "./firedept/ELW1";
import { GWÖL } from "./firedept/GWÖL";

import { Ambulance } from "./ems/Ambulance";
import { Rüstwagen } from "./firedept/Rüstwagen";
import { TLF4000 } from "./firedept/TLF4000";
import { MLF } from "./firedept/MLF";

export function mapVehicle(name: string) {
  const matchers = [
    // Fire
    { test: ["LF20"], type: LF20 },
    { test: ["DLK 23"], type: FireLadder },
    { test: ["ELW"], type: ELW1 },
    { test: ["GW-ÖL"], type: GWÖL },
    { test: ["RW"], type: Rüstwagen },
    { test: ["TLF4000"], type: TLF4000 },
    { test: ["MLF"], type: MLF },
    // EMS
    { test: ["RTW"], type: Ambulance }
  ];

  for (let index = 0; index < matchers.length; index++) {
    const matcher = matchers[index];

    if (matcher.test.some(test => name.match(test))) {
      return matcher.type;
    }
  }

  throw new Error("Could not categorise Vehicle with name: " + name);
}
