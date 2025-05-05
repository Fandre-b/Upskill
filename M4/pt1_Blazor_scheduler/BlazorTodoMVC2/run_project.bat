@echo off
set DOTNET_WATCH=0

echo Starting API...
start cmd /k "dotnet run --project MvcAPI --no-launch-profile"

echo Starting Blazor UI...
start cmd /k "dotnet run --project BlazorUI --no-launch-profile"

echo All services started without hot reload!

