#!/bin/bash

echo "Starting Play Store Microservices..."

# Start Eureka Server
echo "Starting Eureka Server..."
cd /app/eureka-server
mvn spring-boot:run > /tmp/eureka.log 2>&1 &
EUREKA_PID=$!
echo "Eureka Server started with PID: $EUREKA_PID"

# Wait a bit for Eureka to start
sleep 15

# Start Config Server
echo "Starting Config Server..."
cd /app/config-server
mvn spring-boot:run > /tmp/config.log 2>&1 &
CONFIG_PID=$!
echo "Config Server started with PID: $CONFIG_PID"

# Wait a bit for Config Server to start
sleep 10

# Start API Gateway
echo "Starting API Gateway..."
cd /app/api-gateway
mvn spring-boot:run > /tmp/gateway.log 2>&1 &
GATEWAY_PID=$!
echo "API Gateway started with PID: $GATEWAY_PID"

# Wait a bit for Gateway to start
sleep 10

# Start User Service
echo "Starting User Service..."
cd /app/user-service
mvn spring-boot:run > /tmp/user.log 2>&1 &
USER_PID=$!
echo "User Service started with PID: $USER_PID"

# Start Owner Service
echo "Starting Owner Service..."
cd /app/owner-service
mvn spring-boot:run > /tmp/owner.log 2>&1 &
OWNER_PID=$!
echo "Owner Service started with PID: $OWNER_PID"

# Start Notification Service
echo "Starting Notification Service..."
cd /app/notification-service
mvn spring-boot:run > /tmp/notification.log 2>&1 &
NOTIFICATION_PID=$!
echo "Notification Service started with PID: $NOTIFICATION_PID"

echo "All services started!"
echo "Access the application at: http://localhost:8080"
echo "Eureka Dashboard at: http://localhost:8761"

# Keep script running
wait
