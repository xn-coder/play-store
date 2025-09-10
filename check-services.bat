@echo off

echo *************************************************
echo ***           Checking Service Health       ***
echo *************************************************

REM Check Eureka Server
curl -s http://localhost:8761/actuator/health | findstr "UP"
if %errorlevel% neq 0 (
    echo Eureka Server: DOWN
) else (
    echo Eureka Server: UP
)

REM Check Config Server
curl -s http://localhost:8888/actuator/health | findstr "UP"
if %errorlevel% neq 0 (
    echo Config Server: DOWN
) else (
    echo Config Server: UP
)

REM Check API Gateway
curl -s http://localhost:8080/actuator/health | findstr "UP"
if %errorlevel% neq 0 (
    echo API Gateway: DOWN
) else (
    echo API Gateway: UP
)

REM Check User Service
curl -s http://localhost:8081/actuator/health | findstr "UP"
if %errorlevel% neq 0 (
    echo User Service: DOWN
) else (
    echo User Service: UP
)

REM Check Owner Service
curl -s http://localhost:8082/actuator/health | findstr "UP"
if %errorlevel% neq 0 (
    echo Owner Service: DOWN
) else (
    echo Owner Service: UP
)

REM Check Notification Service
curl -s http://localhost:8083/actuator/health | findstr "UP"
if %errorlevel% neq 0 (
    echo Notification Service: DOWN
) else (
    echo Notification Service: UP
)
