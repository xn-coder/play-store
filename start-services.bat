@echo off

echo *************************************************
echo ***      Building and Starting Services     ***
echo *************************************************

REM Build the project
call mvn clean install

if %errorlevel% neq 0 (
    echo Build failed. Please check the logs.
    exit /b 1
)

REM Start Eureka Server
echo Starting Eureka Server...
start "Eureka Server" java -jar eureka-server/target/eureka-server-0.0.1-SNAPSHOT.jar

REM Start Config Server
echo Starting Config Server...
start "Config Server" java -jar config-server/target/config-server-1.0.0.jar

REM Start API Gateway
echo Starting API Gateway...
start "API Gateway" java -jar api-gateway/target/api-gateway-1.0.0.jar

REM Start User Service
echo Starting User Service...
start "User Service" java -jar user-service/target/user-service-1.0.0.jar

REM Start Owner Service
echo Starting Owner Service...
start "Owner Service" java -jar owner-service/target/owner-service-1.0.0.jar

REM Start Notification Service
echo Starting Notification Service...
start "Notification Service" java -jar notification-service/target/notification-service-1.0.0.jar

echo.
echo All services are starting in separate windows.
