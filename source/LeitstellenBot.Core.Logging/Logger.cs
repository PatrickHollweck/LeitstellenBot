using System;

namespace LeitstellenBot.Core.Logging
{
	public enum LogLevel
	{
		Fatal,
		Error,
		Warn,
		Info,
		Debug,
		Trace,
		None
	}

	public abstract class Logger
	{
		public abstract void ProcessMessage(string message);

		public virtual string FormatMessage(LogLevel level, string message)
		{
			return $"{DateTime.Now.ToShortDateString()}|{DateTime.Now.ToLongTimeString()} [{level}] -- {message}";
		}
	}
}
