using System.Linq;
using System.Collections.Generic;

using LeitstellenBot.Core.Buildings;
using LeitstellenBot.Core.Emergencies;

namespace LeitstellenBot.Core.Dispatcher
{
	public class Dispatcher
	{
		public List<Building> Buildings;
		public List<Emergency> ActiveEmergencies;

		public Dispatcher(ICollection<Building> buildings)
		{
			Buildings = buildings.ToList();
		}
	}
}