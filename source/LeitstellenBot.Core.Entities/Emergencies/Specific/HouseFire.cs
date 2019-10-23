using System.Collections.Generic;
using LeitstellenBot.Core.Entities.Vehicles.FireDepartment.Specific;

namespace LeitstellenBot.Core.Entities.Emergencies.Specific
{
	public class HouseFire : Emergency
	{
		public HouseFire()
		{
			VehicleRequirements = new List<VehicleRequirement>
			{
				VehicleRequirement.Create<LF20>(2),
				VehicleRequirement.Create<DLK23>(1)
			};
		}
	}
}