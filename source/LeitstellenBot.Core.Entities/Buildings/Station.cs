using System.Collections.Generic;
using System.Linq;
using LeitstellenBot.Core.Entities.Vehicles;

namespace LeitstellenBot.Core.Entities.Buildings
{
	public class Station : Building
	{
		public readonly string Name;

		public List<EmergencyVehicle> Vehicles;

		public Station(string name, ICollection<EmergencyVehicle> vehicles = default)
		{
			Name = name;
			Vehicles = vehicles == null ? new List<EmergencyVehicle>() : vehicles.ToList();
		}
	}
}