using System.Linq;
using System.Collections.Generic;

using LeitstellenBot.Core.Entities.Vehicles;
using LeitstellenBot.Core.Entities.Buildings;
using LeitstellenBot.Core.Entities.Emergencies;
using LeitstellenBot.Core.Logging;

namespace LeitstellenBot.Core.Dispatcher
{
	public class Dispatcher
	{
		public List<Building> Buildings { get; protected set; }
		public List<Emergency> ActiveEmergencies { get; protected set; }

		public Dispatcher(ICollection<Building> buildings)
		{
			Buildings = buildings.ToList();
			ActiveEmergencies = new List<Emergency>();
		}

		public void AddEmergency(Emergency emergency)
		{
			ActiveEmergencies.Add(emergency);
			Log.Trace($"Emergency '{emergency}' Added! -- Total: {ActiveEmergencies.Count}");
		}

		public void Tick()
		{
			foreach (var emergency in ActiveEmergencies)
			{
				DispatchVehicles(emergency);
			}

			Log.Trace("Tick end");
		}

		public void DispatchVehicles(Emergency emergency)
		{
			if (!emergency.NeedsFurtherVehicles())
			{
				Log.Trace($"{emergency.GetName()} does not need further Vehicles...");
				return;
			}

			var availableVehicles = new List<EmergencyVehicle>();
			foreach (var station in GetStations())
			{
				availableVehicles.AddRange(
					station.Vehicles.Where(vehicle => vehicle.Status == VehicleStatus.Idle)
				);
			}

			foreach (var requirement in emergency.VehicleRequirements)
			{
				while(true)
				{
					var matchingAvailableVehicles = availableVehicles
						.Where(vehicle => requirement.Matches(vehicle))
						.ToList();

					if (requirement.IsFullfilled(emergency))
					{
						break;
					}

					if (!matchingAvailableVehicles.Any())
					{
						Log.Trace($"Missing a '{requirement.Type.Name}' to fulfill {emergency}");
						break;
					}

					var chosen = matchingAvailableVehicles.First();

					emergency.Dispatch(chosen);
					availableVehicles.Remove(chosen);
				}
			}
		}

		public List<Station> GetStations()
		{
			return Buildings.OfType<Station>().ToList();
		}
	}
}