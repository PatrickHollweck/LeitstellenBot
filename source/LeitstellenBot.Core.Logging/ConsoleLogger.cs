using System;

namespace LeitstellenBot.Core.Logging
{
	public class ConsoleLogger : Logger
	{
		public override void ProcessMessage(string message)
		{
			Console.WriteLine(message);
		}
	}
}