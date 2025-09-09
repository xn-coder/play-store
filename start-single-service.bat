@echo off
if "%1"=="" (
    echo Usage: start-single-service.bat [service-name]
    echo Available services: eureka, config, user, owner, notification, gateway, frontend
    pause
    exit /b 1
)

set SERVICE=%1

if "%SERVICE%"=="eureka" (
    echo Starting Eureka Server...
    cd /d "%~dp0eureka-server"
    mvn spring-boot:run
) else if "%SERVICE%"=="config" (
    echo Starting Config Server...
    cd /d "%~dp0config-server"
    mvn spring-boot:run
) else if "%SERVICE%"=="user" (
    echo Starting User Service...
    cd /d "%~dp0user-service"
    mvn spring-boot:run
) else if "%SERVICE%"=="owner" (
    echo Starting Owner Service...
    cd /d "%~dp0owner-service"
    mvn spring-boot:run
) else if "%SERVICE%"=="notification" (
    echo Starting Notification Service...
    cd /d "%~dp0notification-service"
    mvn spring-boot:run
) else if "%SERVICE%"=="gateway" (
    echo Starting API Gateway...
    cd /d "%~dp0api-gateway"
    mvn spring-boot:run
) else if "%SERVICE%"=="frontend" (
    echo Starting Frontend Server...
    cd /d "%~dp0frontend"
    python -m http.server 3000
) else (
    echo Invalid service name: %SERVICE%
    echo Available services: eureka, config, user, owner, notification, gateway, frontend
    pause
    exit /b 1
)

pause