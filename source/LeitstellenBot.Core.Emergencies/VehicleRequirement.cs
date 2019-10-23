using System;

using LeitstellenBot.Core.Vehicles;

namespace LeitstellenBot.Core.Emergencies
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

		public static VehicleRequirement Create<T>(int amount)
			where T : EmergencyVehicle
		{
			return new VehicleRequirement(typeof(T), amount);
		}
	}
}