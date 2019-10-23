using System;
using System.Linq;
using LeitstellenBot.Core.Entities.Vehicles;

namespace LeitstellenBot.Core.Entities.Emergencies
{
	public class VehicleRequirement
	{
		public Type Type;
		public int Amount;

		private VehicleRequirement(Type type, int amount)
		{
			Type = type;
			Amount = amount;
		}

		public bool Matches(Type given)
		{
			return given == Type || given.IsSubclassOf(Type);
		}

		public bool Matches(object given)
		{
			return Matches(given.GetType());
		}

		public bool IsFullfilled(Emergency emergency)
		{
			var matchingAssigned = emergency.AssignedVehicles.Where(Matches).Count();

			return matchingAssigned >= Amount;
		}

		public static VehicleRequirement Create<T>(int amount)
			where T : EmergencyVehicle
		{
			return new VehicleRequirement(typeof(T), amount);
		}
	}
}