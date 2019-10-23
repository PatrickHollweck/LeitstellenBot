using Xunit;

using LeitstellenBot.Core.Entities.Emergencies.Specific;
using LeitstellenBot.Core.Entities.Vehicles.FireDepartment.Specific;

namespace LeitstellenBot.Test
{
	public class EmergencyTests
	{
		[Fact]
		public void NeedsFurtherVehicles_ShouldReturnTrue_IfFurtherVehiclesAreNeeded()
		{
			var houseFire = new HouseFire();
			Assert.True(houseFire.NeedsFurtherVehicles());
		}

		[Fact]
		public void NeedsFurtherVehicles_ShouldReturnFalse_IfNoFurtherVehiclesAreNeeded()
		{
			var houseFire = new HouseFire();
			houseFire.Dispatch(new LF20());
			houseFire.Dispatch(new LF20());
			houseFire.Dispatch(new DLK23());

			Assert.False(houseFire.NeedsFurtherVehicles());
		}
	}
}