# Play Store Application - Windows Setup Guide

## 🎯 Overview
This is a complete microservices-based Play Store application built with Spring Boot, designed to work seamlessly on Windows systems.

## 🛠️ Prerequisites for Windows

### Required Software:
1. **Java 17+** - [Download OpenJDK](https://adoptium.net/)
2. **Maven 3.6+** - [Download Maven](https://maven.apache.org/download.cgi)
3. **Python 3.7+** - [Download Python](https://www.python.org/downloads/)
4. **Git** - [Download Git](https://git-scm.com/download/win)

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

### 3. Check Service Status
Monitor service health:
```batch
check-services.bat
```

### 4. Stop All Services
When finished:
```batch
stop-services.bat
```

## 📁 Project Structure

```
C:\app\
├── eureka-server\          # Service Discovery (Port 8761)
├── config-server\          # Configuration Server (Port 8888)
├── api-gateway\            # API Gateway (Port 8080)
├── user-service\           # User Management (Port 8081)
├── owner-service\          # App Owner Management (Port 8082)
├── notification-service\   # Email Notifications (Port 8083)
├── frontend\               # Web Frontend (Port 3000)
├── start-services.bat      # Windows startup script
├── stop-services.bat       # Windows shutdown script
├── check-services.bat      # Service health check
└── setup-windows.bat       # Prerequisites checker
```

## 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main Web Application |
| **API Gateway** | http://localhost:8080 | All API Requests |
| **Eureka Dashboard** | http://localhost:8761 | Service Registry |
| **User Service** | http://localhost:8081 | Direct User API |
| **Owner Service** | http://localhost:8082 | Direct Owner API |
| **Notification Service** | http://localhost:8083 | Direct Notification API |

### Database Consoles (H2):
- **User DB**: http://localhost:8081/h2-console
- **Owner DB**: http://localhost:8082/h2-console  
- **Notification DB**: http://localhost:8083/h2-console

**Connection Details for H2:**
- JDBC URL: `jdbc:h2:mem:[service]db` (e.g., `jdbc:h2:mem:userdb`)
- Username: `sa`
- Password: `password`

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
- **start-single-service.bat [service]** - Start individual services
- **stop-services.bat** - Stops all Java and Python processes
- **check-services.bat** - Health check for all services
- **setup-windows.bat** - Verifies prerequisites

### Service Management:
Services start in separate command prompt windows for easy monitoring. Each service shows its logs in real-time.

### Available Services for Individual Start:
```batch
start-single-service.bat eureka
start-single-service.bat config  
start-single-service.bat user
start-single-service.bat owner
start-single-service.bat notification
start-single-service.bat gateway
start-single-service.bat frontend
```

## 🧪 Testing the Application

### 1. Test User Registration:
```bash
curl -X POST http://localhost:8080/api/users/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"testuser\", \"email\": \"test@example.com\", \"password\": \"password123\"}"
```

### 2. Test Owner Registration:
```bash
curl -X POST http://localhost:8080/api/owners/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"appowner\", \"email\": \"owner@example.com\", \"password\": \"password123\", \"companyName\": \"Tech Corp\"}"
```

### 3. Browse Apps:
```bash
curl http://localhost:8080/api/apps/
```

### 4. Search Apps:
```bash
curl "http://localhost:8080/api/apps/search?query=game"
```

## 🏗️ Architecture

### Microservices:
- **Eureka Server**: Service discovery and registration
- **API Gateway**: Single entry point with routing
- **User Service**: User authentication and review management
- **Owner Service**: App owner management and app CRUD
- **Notification Service**: Email notifications system
- **Frontend**: React-like SPA with Bootstrap

### Key Features:
- ✅ JWT Authentication for both users and owners
- ✅ H2 in-memory databases per service
- ✅ Service discovery with Eureka
- ✅ API Gateway routing
- ✅ Swagger documentation for all APIs
- ✅ Email notifications (configurable)
- ✅ Real-time download tracking
- ✅ Review and rating system
- ✅ App visibility control
- ✅ Comprehensive error handling

## 🛡️ Security Features

- JWT-based authentication
- Role-based authorization (USER/OWNER)
- CORS enabled for frontend integration
- Secure password handling
- Protected endpoints for sensitive operations

## 📊 Database Schema

### User Service DB (`userdb`):
- `users` - User accounts
- `reviews` - App reviews and ratings

### Owner Service DB (`ownerdb`):
- `owners` - App owner accounts  
- `apps` - Application catalog

### Notification Service DB (`notificationdb`):
- `notifications` - Email notification history

## 🚨 Troubleshooting

### Common Windows Issues:

1. **"Java not found"**
   - Install Java 17+ and add to PATH
   - Verify with: `java -version`

2. **"Maven not found"**
   - Install Maven and add to PATH
   - Verify with: `mvn --version`

3. **Services won't start**
   - Check if ports are available
   - Run `netstat -an | findstr :8080` to check port usage
   - Close other applications using these ports

4. **Frontend not loading**
   - Ensure Python is installed
   - Try: `python --version`
   - Alternative: Use `python3 -m http.server 3000`

5. **API calls failing**
   - Wait for all services to start (can take 2-3 minutes)
   - Check service status with `check-services.bat`
   - Verify Eureka dashboard shows all services

### Performance Tips:
- Allow Java processes through Windows Firewall
- Close unnecessary applications to free memory
- Services need ~2GB RAM total
- Use SSD storage for better performance

## 📝 Development Notes

- All services use H2 in-memory databases (data resets on restart)
- Frontend uses fetch API for REST calls
- JWT tokens expire after 24 hours
- Email notifications are optional (works without SMTP)
- All services auto-register with Eureka

## 🔄 Updates and Maintenance

To update the application:
1. Stop all services: `stop-services.bat`
2. Pull latest changes: `git pull`
3. Restart services: `start-services.bat`

For development:
- Modify source code
- Services have hot-reload enabled
- Frontend changes are immediate
- Database changes require service restart

---

**Need Help?** 
- Check service logs in the command prompt windows
- Verify all prerequisites are installed
- Ensure no other applications are using the required ports
- Try restarting services individually if needed

Happy coding! 🚀