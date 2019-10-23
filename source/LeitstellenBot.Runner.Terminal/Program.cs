using System;
using System.Collections.Generic;

using LeitstellenBot.Core.Dispatcher;

using LeitstellenBot.Core.Entities.Buildings;
using LeitstellenBot.Core.Entities.Emergencies.Specific;
using LeitstellenBot.Core.Entities.Vehicles;
using LeitstellenBot.Core.Entities.Vehicles.FireDepartment.Specific;
using LeitstellenBot.Core.Logging;

namespace LeitstellenBot.Runner.Terminal
{
	class Program
	{
		static void Main(string[] _)
		{
			var fireStationPfaffenhofen = new Station("FFW Pfaffenhofen", new List<EmergencyVehicle>()
			{
				new LF20(),
				new LF20(),
				new LF20(),
			});

			var fireStationKastl = new Station("FFW Kastl", new List<EmergencyVehicle>()
			{
				new DLK23(),
				new DLK23(),
			});

			var stations = new List<Building>()
			{
				fireStationKastl,
				fireStationPfaffenhofen
			};

			var dispatcher = new Dispatcher(stations);
			dispatcher.AddEmergency(new HouseFire());
			dispatcher.AddEmergency(new HouseFire());
			dispatcher.AddEmergency(new HouseFire());

			dispatcher.Tick();

			Log.Debug("PROGRAM END");
			Console.ReadLine();
		}
	}
}
