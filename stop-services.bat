@echo off

echo *************************************************
echo ***           Stopping All Services         ***
echo *************************************************

REM Find and kill all Java processes
taskkill /F /IM java.exe /T >nul

echo All Java processes have been terminated.
