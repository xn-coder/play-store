@echo off
echo Starting Play Store Microservices on Windows...
echo.

REM Set JAVA_HOME if not set
if "%JAVA_HOME%"=="" (
    echo Warning: JAVA_HOME not set. Attempting to find Java installation...
    
    REM Try to find Java installation using reg query
    for /f "tokens=2*" %%a in ('reg query "HKLM\SOFTWARE\JavaSoft\Java Development Kit" /v CurrentVersion 2^>nul') do (
        set JDK_VERSION=%%b
    )
    
    if defined JDK_VERSION (
        for /f "tokens=2*" %%a in ('reg query "HKLM\SOFTWARE\JavaSoft\Java Development Kit\%JDK_VERSION%" /v JavaHome 2^>nul') do (
            set JAVA_HOME=%%b
            echo Found Java installation at: %%b
        )
    )
    
    if "%JAVA_HOME%"=="" (
        echo Warning: Could not automatically detect JAVA_HOME. Using system Java.
        echo Please set JAVA_HOME environment variable for better reliability.
    ) else (
        set PATH=%JAVA_HOME%\bin;%PATH%
    )
)

REM Check if Maven is available
mvn -version >nul 2>&1
if errorlevel 1 (
    echo Error: Maven not found in PATH. Please install Maven and add it to PATH.
    pause
    exit /b 1
)

echo Starting Eureka Server...
cd /d "%~dp0eureka-server"
start "Eureka Server" cmd /k "mvn spring-boot:run"
echo Eureka Server starting on port 8761...
echo Waiting 20 seconds for Eureka to start...
timeout /t 20 /nobreak >nul

echo.
echo Starting Config Server...
cd /d "%~dp0config-server"
start "Config Server" cmd /k "mvn spring-boot:run"
echo Config Server starting on port 8888...
echo Waiting 15 seconds for Config Server to start...
timeout /t 15 /nobreak >nul

echo.
echo Starting User Service...
cd /d "%~dp0user-service"
start "User Service" cmd /k "mvn spring-boot:run"
echo User Service starting on port 8081...

echo.
echo Starting Owner Service...
cd /d "%~dp0owner-service"
start "Owner Service" cmd /k "mvn spring-boot:run"
echo Owner Service starting on port 8082...

echo.
echo Starting Notification Service...
cd /d "%~dp0notification-service"
start "Notification Service" cmd /k "mvn spring-boot:run"
echo Notification Service starting on port 8083...

echo Waiting 20 seconds for services to start...
timeout /t 20 /nobreak >nul

echo.
echo Starting API Gateway...
cd /d "%~dp0api-gateway"
start "API Gateway" cmd /k "mvn spring-boot:run"
echo API Gateway starting on port 8080...

echo Waiting 15 seconds for API Gateway to start...
timeout /t 15 /nobreak >nul

echo.
echo Starting Frontend Server...
cd /d "%~dp0frontend"
start "Frontend Server" cmd /k "python -m http.server 3000"
echo Frontend Server starting on port 3000...

echo.
echo ========================================
echo All services started successfully!
echo ========================================
echo Frontend: http://localhost:3000
echo API Gateway: http://localhost:8080
echo Eureka Dashboard: http://localhost:8761
echo User Service: http://localhost:8081
echo Owner Service: http://localhost:8082
echo Notification Service: http://localhost:8083
echo ========================================
echo.
echo Press any key to open frontend in browser...
pause >nul
start http://localhost:3000

echo.
echo Services are running in separate windows.
echo Close this window or press Ctrl+C to stop monitoring.
pause