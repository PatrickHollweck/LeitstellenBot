﻿using LeitstellenBot.Core.Entities.Buildings;

namespace LeitstellenBot.Core.Entities.Vehicles
{
	public enum VehicleStatus
	{
		Idle,
		Enroute,
		OnScene
	}

	public abstract class EmergencyVehicle
	{
		public Station Station;

		public VehicleStatus Status;

		public int CrewSize;

		protected EmergencyVehicle(int crewSize)
		{
			Status = VehicleStatus.Idle;
			CrewSize = crewSize;
		}

		public void SetStation(Station station)
		{
			Station = station;
		}
	}
}
