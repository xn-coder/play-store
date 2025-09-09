@echo off
echo Stopping Play Store Microservices...

REM Kill Java processes related to our services
echo Stopping Spring Boot services...
taskkill /f /im java.exe 2>nul
echo Spring Boot services stopped.

REM Kill Python HTTP server
echo Stopping Frontend server...
taskkill /f /im python.exe 2>nul
echo Frontend server stopped.

echo.
echo All services stopped.
pause