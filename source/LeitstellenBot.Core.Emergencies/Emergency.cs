using System.Linq;
using System.Collections.Generic;

namespace LeitstellenBot.Core.Emergencies
{
	public abstract class Emergency
	{
		public List<VehicleRequirement> VehicleRequirements { get; set; }
	}
}
