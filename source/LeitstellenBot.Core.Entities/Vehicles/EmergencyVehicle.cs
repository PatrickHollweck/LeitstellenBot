using LeitstellenBot.Core.Entities.Buildings;
using LeitstellenBot.Core.Logging;

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

		protected VehicleStatus status;
		public VehicleStatus Status
		{
			get => status;
			set
			{
				Log.Trace($"{this} -> Status Changed to {value}");
				status = value;
			}
		}

		public int CrewSize;

		public string Name;

		protected EmergencyVehicle(int crewSize)
		{
			Status = VehicleStatus.Idle;
			CrewSize = crewSize;
			Name = "";
		}

		public void SetStation(Station station)
		{
			Station = station;
		}

		public override string ToString()
		{
			return $"{GetType().Name} '{Name ?? "<No-Name>"}' from {Station?.Name ?? "<No-Station>"} (Status: {Status})";
		}
	}
}
