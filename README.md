# PlayStore Microservices Platform

Welcome to the PlayStore Microservices Platform – a comprehensive, scalable, and distributed application designed to simulate a digital app store experience. This project demonstrates a robust microservices architecture, providing functionalities for users to browse, install, and review applications, while empowering app owners to publish and manage their applications within the ecosystem.

## ✨ Features

*   **User Management:** Secure user registration and authentication, profile management.
*   **Owner Management:** Dedicated registration and login for app owners to publish and oversee their applications.
*   **Application Catalog:** A dynamic catalog allowing users to discover and browse a wide array of applications.
*   **Search Functionality:** Efficient search capabilities to find applications by name, category, or other criteria.
*   **App Installation:** Simulate the installation process for applications.
*   **App Reviews & Ratings:** Users can leave reviews and ratings for installed applications.
*   **Notification System:** Integrated service for delivering system notifications (e.g., app updates, review responses).
*   **Service Discovery:** Centralized service registration and discovery to manage dynamic service instances.
*   **Centralized Configuration:** Externalized and unified configuration management across all microservices.
*   **API Gateway:** A single entry point for all client requests, providing routing, load balancing, and cross-cutting concerns.
*   **Responsive Frontend:** An intuitive and user-friendly web interface for seamless interaction.

## 🚀 Tech Stack

This project leverages a modern and powerful set of technologies to build a resilient and scalable microservices architecture:

*   **Backend:** Java 17, Spring Boot, Spring Cloud (Eureka Server for Service Discovery, Config Server for Centralized Configuration, API Gateway), Spring Data JPA.
*   **Database:** H2 Database (for development; easily configurable for production-grade relational databases).
*   **Security:** Spring Security with JSON Web Tokens (JWT) for robust authentication and authorization.
*   **Frontend:** Spring MVC (Thymeleaf for server-side rendering of dynamic web pages).
*   **Build Tool:** Apache Maven.
*   **Containerization:** Docker (for containerizing individual microservices).
*   **Scripts:** Bash scripts (`.sh`) for Linux/macOS and Batch scripts (`.bat`) for Windows to simplify service startup.
*   **CI/CD:** GitHub Actions (indicated by `.github/workflows`).

## ⚙️ Quick Start

Follow these steps to get the PlayStore Microservices Platform up and running on your local machine.

### Prerequisites

*   **Java Development Kit (JDK) 17 or higher:** Ensure `JAVA_HOME` is set.
*   **Apache Maven 3.6.x or higher:** For building the projects.
*   **Git:** For cloning the repository.
*   **Docker (Optional but Recommended):** For containerized deployment.

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name> # e.g., cd playstore-microservices
    ```

2.  **Build All Services:**
    Navigate to the project root directory and build all microservices using Maven. This will compile the code, run tests, and package each service into an executable JAR file.

    ```bash
    # Using Maven wrapper (recommended)
    ./mvnw clean install  # For Linux/macOS
    mvnw.cmd clean install # For Windows

    # Or using globally installed Maven
    mvn clean install
    ```

    This command will build all sub-projects (e.g., `eureka-server`, `config-server`, `user-service`, `frontend-service`, etc.).

3.  **Run All Services:**
    The project includes convenient scripts to start all microservices in the correct order.

    *   **For Linux/macOS:**
        ```bash
        ./run-services.sh
        ```

    *   **For Windows:**
        ```bash
        .\stop-services.bat # (Optional: if services were running previously)
        .\run-services.bat
        ```
    These scripts will typically start:
    1.  `config-server`
    2.  `eureka-server` (and `discovery-server` if separate)
    3.  `user-service`, `owner-service`, `app-service`, `notification-service`, `search-service`
    4.  `api-gateway`
    5.  `frontend-service`

    Each service will start in its own process, and you can observe their logs in your terminal.

4.  **Access the Application:**
    Once all services have successfully started (this might take a few moments), open your web browser and navigate to the frontend service:

    ```
    http://localhost:8080
    ```
    (The exact port might vary if configured differently in `frontend-service/src/main/resources/application.yml` or `.properties`.)

You should now be able to interact with the PlayStore Microservices Platform!