namespace LeitstellenBot.Core.Logging
{
	public class Log
	{
		public static LogLevel Level = LogLevel.Trace;

		protected static Logger Proxy;

		public static void Trace(string message)
		{
			InvokeProxy(LogLevel.Trace, message);
		}

		public static void Debug(string message)
		{
			InvokeProxy(LogLevel.Debug, message);
		}

		public static void Info(string message)
		{
			InvokeProxy(LogLevel.Info, message);
		}

		public static void Warn(string message)
		{
			InvokeProxy(LogLevel.Warn, message);
		}

		public static void Error(string message)
		{
			InvokeProxy(LogLevel.Error, message);
		}

		public static void Fatal(string message)
		{
			InvokeProxy(LogLevel.Fatal, message);
		}

		protected static void InvokeProxy(LogLevel level, string message)
		{
			if (level > Level) return;

			if (Proxy == null)
			{
				Proxy = new ConsoleLogger();
				Error("No Logger specified... Defaulting to Console-Output");
			}

			Proxy.ProcessMessage(Proxy.FormatMessage(level, message));
		}

	}
}