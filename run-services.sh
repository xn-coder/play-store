#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to start a service
start_service() {
    echo "Starting $1..."
    cd $1
    mvn spring-boot:run > ../$1.log 2>&1 &
    cd ..
    echo "$1 started and logging to $1.log"
}

# Kill all existing Java processes to ensure a clean start
if pgrep -f java; then
    echo "Killing existing Java processes..."
    pkill -f java
fi

# Start services in the correct order
start_service "config-server"
sleep 10 # Wait for config-server to be ready
start_service "discovery-server"
sleep 20 # Wait for discovery-server to be ready
start_service "api-gateway"
start_service "owner-service"
start_service "user-service"
start_service "notification-service"
start_service "search-service"
start_service "frontend-service"

echo "All services started successfully!"