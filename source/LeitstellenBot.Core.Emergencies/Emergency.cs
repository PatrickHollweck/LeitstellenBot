using System.Linq;
using System.Collections.Generic;
using LeitstellenBot.Core.Vehicles;

namespace LeitstellenBot.Core.Emergencies
{
	public abstract class Emergency
	{
		public List<EmergencyVehicle> AssignedVehicles;
		public List<VehicleRequirement> VehicleRequirements;

		protected Emergency()
		{
			AssignedVehicles = new List<EmergencyVehicle>();
			VehicleRequirements = new List<VehicleRequirement>();
		}

		public bool NeedsFurtherVehicles()
		{
			foreach (var requirement in VehicleRequirements)
			{
				int assignedOfRequirement = AssignedVehicles.Aggregate(0, (acc, current) =>
				{
					if (requirement.Matches(current))
					{
						return acc + 1;
					}

					return acc;
				});

				if(assignedOfRequirement < requirement.Amount)
				{
					return true;
				}
			}

			return false;
		}

		public void Dispatch(EmergencyVehicle vehicle)
		{
			vehicle.Status = VehicleStatus.Enroute;

			AssignedVehicles.Add(vehicle);
		}
	}
}
