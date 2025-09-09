@echo off
echo Checking Play Store Services Status...
echo.

echo Checking Eureka Server (Port 8761)...
curl -s http://localhost:8761/actuator/health >nul 2>&1
if errorlevel 1 (
    echo ❌ Eureka Server - Not Running
) else (
    echo ✅ Eureka Server - Running
)

echo Checking User Service (Port 8081)...
curl -s http://localhost:8081/actuator/health >nul 2>&1
if errorlevel 1 (
    echo ❌ User Service - Not Running
) else (
    echo ✅ User Service - Running
)

echo Checking Owner Service (Port 8082)...
curl -s http://localhost:8082/actuator/health >nul 2>&1
if errorlevel 1 (
    echo ❌ Owner Service - Not Running
) else (
    echo ✅ Owner Service - Running
)

echo Checking Notification Service (Port 8083)...
curl -s http://localhost:8083/api/notifications/health >nul 2>&1
if errorlevel 1 (
    echo ❌ Notification Service - Not Running
) else (
    echo ✅ Notification Service - Running
)

echo Checking API Gateway (Port 8080)...
curl -s http://localhost:8080/actuator/health >nul 2>&1
if errorlevel 1 (
    echo ❌ API Gateway - Not Running
) else (
    echo ✅ API Gateway - Running
)

echo Checking Frontend (Port 3000)...
curl -s http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo ❌ Frontend - Not Running
) else (
    echo ✅ Frontend - Running
)

echo.
echo Service check complete!
pause