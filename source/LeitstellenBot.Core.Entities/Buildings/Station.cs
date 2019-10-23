using System.Collections.Generic;
using System.Linq;
using LeitstellenBot.Core.Entities.Vehicles;
using LeitstellenBot.Core.Logging;

namespace LeitstellenBot.Core.Entities.Buildings
{
	public class Station : Building
	{
		public readonly string Name;

		public List<EmergencyVehicle> Vehicles { get; set; }

		public static int IdCounter = 0;

		public Station(string name, ICollection<EmergencyVehicle> vehicles = null)
		{
			Name = name;
			Vehicles = new List<EmergencyVehicle>();

			if (vehicles == null)
			{
				return;
			}

			foreach (var vehicle in vehicles)
			{
				AssignVehicleToStation(vehicle);
			}
		}

		public void AssignVehicleToStation(EmergencyVehicle vehicle)
		{
			vehicle.SetStation(this);
			vehicle.Name = IdCounter++.ToString();
			Vehicles.Add(vehicle);

			Log.Trace($"Added {vehicle} to {this}");
		}

		public override string ToString()
		{
			return $"{Name}";
		}
	}
}