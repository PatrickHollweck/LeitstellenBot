namespace LeitstellenBot.Core.Vehicles.FireDepartment {
	public abstract class FireEngine : EmergencyVehicle
	{
		protected FireEngine(int crewSize)
			: base(crewSize)
		{
		}
	}
}
