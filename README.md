# Play Store Microservices

This project is a simplified microservices-based application that mimics a Play Store. It consists of several services that work together to provide functionality for users and app owners.

## Services

The following services are included in this project:

*   **config-server:** A central configuration server for all the microservices.
*   **discovery-server:** A service registry and discovery server (using Eureka).
*   **api-gateway:** A single entry point for all the client requests. It also serves the frontend application.
*   **user-service:** Manages user registration, login, and app installation.
*   **owner-service:** Manages app owner registration, login, and app management.
*   **notification-service:** Sends notifications to users (e.g., when a new app is installed).
*   **search-service:** Provides search functionality for apps.

## How to Run

To run all the services, you can use the `run-services.sh` script:

```bash
./run-services.sh
```

This will start all the services in the correct order. The services will be running in the background and their logs will be saved to corresponding log files (e.g., `api-gateway.log`).

## Accessing the Application

Once the services are running, you can access the application at:

[http://localhost:8081](http://localhost:8081)

This will open the main page of the Play Store. From there, you can navigate to the login and registration pages.

## Health Check

The `api-gateway` provides a health check endpoint to verify if the service is running. You can access it at:

[http://localhost:8081/health](http://localhost:8081/health)

If the service is running, it will return the message "API Gateway is running".
