using System;

namespace LeitstellenBot.Core.Vehicles
{
	public enum VehicleStatus
	{
		Idle,
		Enroute,
		OnScene
	}

	public abstract class EmergencyVehicle
	{
		public VehicleStatus Status;

		public int CrewSize;

		protected EmergencyVehicle(int crewSize)
		{
			Status = VehicleStatus.Idle;
			CrewSize = crewSize;
		}
	}
}
