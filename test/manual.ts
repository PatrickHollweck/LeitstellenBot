import { Simulation } from "../source/simulation/Simulation";

import { HouseFire } from "../source/simulation/emergencies/HouseFire";

import { Station } from "../source/simulation/Station";

import { LF20 } from "../source/simulation/vehicles/firedept/LF20";
import { FireLadder } from "../source/simulation/vehicles/firedept/FireLadder";

const s = new Simulation();

// -- Create Stations
const fireStationPfaffenhofen = new Station("FFW Pfaffenhofen");

fireStationPfaffenhofen.vehicles.push(
  new LF20(fireStationPfaffenhofen),
  new LF20(fireStationPfaffenhofen),
  new FireLadder(fireStationPfaffenhofen)
);

// -- Setup Simulation
s.stations.push(fireStationPfaffenhofen);
s.emergencies.push(new HouseFire());

s.dispatchVehicles();
