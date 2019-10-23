using System.Collections.Generic;
using LeitstellenBot.Core.Dispatcher;
using Xunit;

using LeitstellenBot.Core.Entities.Buildings;
using LeitstellenBot.Core.Entities.Emergencies.Specific;
using LeitstellenBot.Core.Entities.Vehicles;
using LeitstellenBot.Core.Entities.Vehicles.FireDepartment.Specific;

namespace LeitstellenBot.Test
{
	public class DispatcherTests
	{
		public static List<Building> GetDefaultStations()
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

			return new List<Building>()
			{
				fireStationPfaffenhofen,
				fireStationKastl
			};
		}

		public Dispatcher GetDefaultDispatcher()
		{
			return new Dispatcher(GetDefaultStations());
		}

		[Fact]
		public void ItShould_Dispatch_Vehicle_To_Emergencies()
		{
			var dispatcher = GetDefaultDispatcher();
			dispatcher.AddEmergency(new HouseFire());
			dispatcher.AddEmergency(new HouseFire());

			dispatcher.Tick();

			Assert.False(dispatcher.ActiveEmergencies[0].NeedsFurtherVehicles());
			Assert.False(dispatcher.ActiveEmergencies[1].NeedsFurtherVehicles());
		}
	}
}
