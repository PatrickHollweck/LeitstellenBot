import { FireLadder } from "./firedept/abstract/FireLadder";
import { Rüstwagen } from "./firedept/Rüstwagen";
import { TLF4000 } from "./firedept/TLF4000";
import { LF20 } from "./firedept/LF20";
import { ELW1 } from "./firedept/ELW1";
import { GWÖL } from "./firedept/GWÖL";
import { MLF } from "./firedept/MLF";
import { GWA } from "./firedept/GWA";

import { Ambulance } from "./ems/Ambulance";

export function mapVehicle(name: string) {
  const matchers = [
    // Fire
    { test: ["LF20", "LF 20"], type: LF20 },
    { test: ["DLK 23"], type: FireLadder },
    { test: ["ELW1", "ELW 1"], type: ELW1 },
    { test: ["GW-ÖL"], type: GWÖL },
    { test: ["GW-A"], type: GWA },
    { test: ["RW"], type: Rüstwagen },
    { test: ["TLF4000", "TLF 4000"], type: TLF4000 },
    { test: ["MLF"], type: MLF },
    // EMS
    { test: ["RTW"], type: Ambulance }
  ];

  for (let index = 0; index < matchers.length; index++) {
    const matcher = matchers[index];

    if (
      matcher.test.some(test =>
        name.toLocaleLowerCase().match(test.toLowerCase())
      )
    ) {
      return matcher.type;
    }
  }

  throw new Error("Could not categorise Vehicle with name: " + name);
}
