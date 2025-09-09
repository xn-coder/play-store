@echo off
echo Setting up Play Store Application for Windows...

REM Create necessary directories
if not exist "C:\emp\logs" mkdir "C:\emp\logs"

REM Check Java installation
echo Checking Java installation...
java -version
if errorlevel 1 (
    echo ERROR: Java is not installed or not in PATH.
    echo Please install Java 17 or higher and add it to your PATH.
    pause
    exit /b 1
)

REM Check Maven installation
echo Checking Maven installation...
mvn --version
if errorlevel 1 (
    echo ERROR: Maven is not installed or not in PATH.
    echo Please install Maven and add it to your PATH.
    pause
    exit /b 1
)

REM Check Python installation
echo Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH.
    echo Please install Python and add it to your PATH.
    pause
    exit /b 1
)

echo.
echo All prerequisites are installed!
echo.
echo To start the application:
echo 1. Run: start-services.bat
echo 2. Or start individual services with: start-single-service.bat [service-name]
echo.
echo Available services: eureka, config, user, owner, notification, gateway, frontend
echo.
echo Access points after starting:
echo - Frontend: http://localhost:3000
echo - API Gateway: http://localhost:8080
echo - Eureka Dashboard: http://localhost:8761
echo.
pause