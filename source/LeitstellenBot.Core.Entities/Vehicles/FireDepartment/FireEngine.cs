namespace LeitstellenBot.Core.Entities.Vehicles.FireDepartment {
	public abstract class FireEngine : EmergencyVehicle
	{
		protected FireEngine(int crewSize)
			: base(crewSize)
		{
		}
	}
}
