@echo off

echo Killing existing Java processes...
taskkill /F /IM java.exe /T >nul 2>&1

echo Starting config-server...
cd config-server
start "" /B mvn spring-boot:run > ../config-server.log 2>&1
cd ..
echo config-server started and logging to config-server.log
timeout /t 10 >nul

echo Starting discovery-server...
cd discovery-server
start "" /B mvn spring-boot:run > ../discovery-server.log 2>&1
cd ..
echo discovery-server started and logging to discovery-server.log
timeout /t 20 >nul

echo Starting api-gateway...
cd api-gateway
start "" /B mvn spring-boot:run > ../api-gateway.log 2>&1
cd ..
echo api-gateway started and logging to api-gateway.log

echo Starting owner-service...
cd owner-service
start "" /B mvn spring-boot:run > ../owner-service.log 2>&1
cd ..
echo owner-service started and logging to owner-service.log

echo Starting user-service...
cd user-service
start "" /B mvn spring-boot:run > ../user-service.log 2>&1
cd ..
echo user-service started and logging to user-service.log

echo Starting notification-service...
cd notification-service
start "" /B mvn spring-boot:run > ../notification-service.log 2>&1
cd ..
echo notification-service started and logging to notification-service.log

echo Starting search-service...
cd search-service
start "" /B mvn spring-boot:run > ../search-service.log 2>&1
cd ..
echo search-service started and logging to search-service.log

echo All services started successfully!
