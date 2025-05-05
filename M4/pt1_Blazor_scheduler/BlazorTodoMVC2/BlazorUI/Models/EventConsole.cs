using System;
using System.Collections.Generic;

namespace BlazorUI.Models;


public class EventConsole
{
    private readonly List<string> _logs = new();

    public void LogEvent(string message)
    {
        _logs.Add(message);
        Console.WriteLine($"[EventConsole] {message}");
    }

    public IEnumerable<string> GetLogs()
    {
        return _logs;
    }
}
