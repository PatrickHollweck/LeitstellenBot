using System.Collections.Generic;

using LeitstellenBot.Core.Vehicles.FireDepartment.Specific;

namespace LeitstellenBot.Core.Emergencies.Specific
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