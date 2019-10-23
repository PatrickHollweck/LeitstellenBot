using System.Linq;
using System.Collections.Generic;

using LeitstellenBot.Core.Vehicles;

namespace LeitstellenBot.Core.Buildings
{
	public class Station : Building
	{
		public readonly string Name;

		public List<EmergencyVehicle> Vehicles;

		public Station(string name, ICollection<EmergencyVehicle> vehicles)
		{
			Name = name;
			Vehicles = vehicles.ToList();
		}
	}
}