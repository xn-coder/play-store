# Play Store Application - Windows Setup Guide

## 🎯 Overview
This is a complete microservices-based Play Store application built with Spring Boot, designed to work seamlessly on Windows systems.

## 🛠️ Prerequisites for Windows

### Required Software:
1. **Java 17+** - [Download OpenJDK](https://adoptium.net/)
2. **Maven 3.6+** - [Download Maven](https://maven.apache.org/download.cgi)
3. **Git** - [Download Git](https://git-scm.com/download/win)

### Optional but Recommended:
- **Windows Terminal** - For better command line experience
- **Visual Studio Code** - For code editing
- **curl** - For API testing (comes with Windows 10+)

## 🚀 Quick Windows Setup

### 1. Install Prerequisites
Run the setup script to check if all prerequisites are installed:
```batch
setup-windows.bat
```

### 2. Start All Services
Use the Windows batch script to start all services:
```batch
start-services.bat
```

This will build all the services and then start them in separate terminal windows.

## ⚙️ How to Run
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/play-store.git
    cd play-store
    ```
2.  **Verify prerequisites:**
    ```batch
    setup-windows.bat
    ```
3.  **Build and start all services:**
    ```batch
    start-services.bat
    ```
4.  **Access the application:**
    -   **API Gateway:** `http://localhost:8080`
    -   **Eureka Dashboard:** `http://localhost:8761`

## 🎮 How to Use the Application

### For Regular Users:
1. **Register/Login** as a User
2. **Browse Apps** by category or search
3. **View App Details** including ratings and reviews
4. **Download Apps** (increments download counter)
5. **Write Reviews** and rate apps
6. **View Your Reviews** in "My Reviews" section

### For App Owners:
1. **Register/Login** as an Owner
2. **Create New Apps** with details and categories
3. **Manage Your Apps** - Edit, Hide/Show, Delete
4. **View Download Statistics** for your apps
5. **See User Reviews** for your applications

## 🔧 Windows-Specific Features

### Batch Scripts:
- **start-services.bat** - Starts all services in separate windows
- **stop-services.bat** - Stops all Java processes
- **check-services.bat** - Health check for all services
- **setup-windows.bat** - Verifies prerequisites
