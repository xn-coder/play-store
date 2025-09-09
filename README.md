# Play Store Microservices Application

This is a complete microservices-based Play Store application built with Spring Boot following the PDF requirements exactly.

## Architecture Overview

The application follows a microservices architecture with:

- **Eureka Server** (Port 8761) - Service discovery and registration
- **API Gateway** (Port 8080) - Single entry point for all requests  
- **User Service** (Port 8081) - User management, authentication, and review system
- **Owner Service** (Port 8082) - App owner management and CRUD operations
- **Notification Service** (Port 8083) - Email notifications system
- **Frontend** - HTML/CSS/JavaScript with fetch API integration

## Features Implemented

### User Features (As per PDF requirements):
1. ✅ User registration, login, logout
2. ✅ Search applications by name
3. ✅ View app details (name, description, release date, version, ratings, genre)
4. ✅ Browse apps by categories (games, beauty, fashion, women, health)
5. ✅ Filter applications by ratings
6. ✅ Write reviews/comments for applications  
7. ✅ JWT-based authentication system

### Owner Features (As per PDF requirements):
1. ✅ Owner registration, login, logout
2. ✅ CRUD operations on applications
3. ✅ Control app visibility (show/hide from users)
4. ✅ View download counts for their applications
5. ✅ View user comments/reviews
6. ✅ JWT-based authentication system

### Technical Implementation:
1. ✅ Spring Boot microservices architecture
2. ✅ H2 database for each microservice
3. ✅ Service discovery with Eureka Server
4. ✅ API Gateway for routing
5. ✅ JWT authentication and Spring Security
6. ✅ Swagger documentation for all services
7. ✅ Custom exception handling
8. ✅ JPA relationships between entities
9. ✅ Frontend with HTML/CSS and fetch API

## Database Schema

### User Service Database:
- **users** table: id, username, email, password, created_at, updated_at
- **reviews** table: id, user_id, app_id, rating, comment, created_at, updated_at

### Owner Service Database:
- **owners** table: id, username, email, password, company_name, created_at, updated_at
- **apps** table: id, name, description, version, genre, icon_url, is_visible, download_count, release_date, owner_id, created_at, updated_at

### Notification Service Database:
- **notifications** table: id, recipient_email, subject, content, sent_at, type, status

## API Endpoints

### User Service (/api/users):
- POST `/auth/register` - User registration
- POST `/auth/login` - User login  
- POST `/auth/logout` - User logout
- POST `/reviews` - Create review (authenticated)
- GET `/reviews/my-reviews` - Get user's reviews (authenticated)
- GET `/reviews/app/{appId}` - Get reviews for an app
- GET `/reviews/app/{appId}/average-rating` - Get average rating

### Owner Service (/api/owners):
- POST `/auth/register` - Owner registration
- POST `/auth/login` - Owner login
- POST `/auth/logout` - Owner logout

### App Management (/api/apps):
- GET `/` - Get all visible apps
- GET `/{id}` - Get app by ID
- GET `/search?query=` - Search apps
- GET `/genre/{genre}` - Get apps by genre
- POST `/{id}/download` - Increment download count

## Running the Application

### Prerequisites:
- Java 17+
- Maven 3.6+

### Start Services in Order:

1. **Start Eureka Server:**
   ```bash
   cd eureka-server
   mvn spring-boot:run
   ```

2. **Start User Service:**
   ```bash
   cd user-service  
   mvn spring-boot:run
   ```

3. **Start Owner Service:**
   ```bash  
   cd owner-service
   mvn spring-boot:run
   ```

4. **Start Notification Service:**
   ```bash
   cd notification-service
   mvn spring-boot:run
   ```

5. **Start API Gateway:**
   ```bash
   cd api-gateway
   mvn spring-boot:run
   ```

6. **Start Frontend:**
   ```bash
   cd frontend
   python3 -m http.server 8080
   ```

### Using Supervisor (Automated):
```bash
# Start all services with supervisor
supervisorctl -c /app/supervisord.conf start all

# Check status
supervisorctl -c /app/supervisord.conf status

# View logs
tail -f /var/log/supervisor/*.log
```

## Access Points

- **Frontend Application**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761  
- **API Gateway**: http://localhost:8080/api/
- **User Service Swagger**: http://localhost:8081/swagger-ui.html
- **Owner Service Swagger**: http://localhost:8082/swagger-ui.html
- **H2 Consoles**: 
  - User DB: http://localhost:8081/h2-console
  - Owner DB: http://localhost:8082/h2-console
  - Notification DB: http://localhost:8083/h2-console

## Testing the Application

### 1. Register a User:
```bash
curl -X POST http://localhost:8080/api/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com", 
    "password": "password123"
  }'
```

### 2. Login User:
```bash
curl -X POST http://localhost:8080/api/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 3. Register an Owner:
```bash  
curl -X POST http://localhost:8080/api/owners/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "appowner",
    "email": "owner@example.com",
    "password": "password123", 
    "companyName": "Tech Corp"
  }'
```

### 4. Browse Apps:
```bash
curl http://localhost:8080/api/apps/
```

### 5. Search Apps:
```bash
curl "http://localhost:8080/api/apps/search?query=game"
```

## Architecture Benefits

1. **Scalability**: Each service can be scaled independently
2. **Maintainability**: Clear separation of concerns
3. **Technology Diversity**: Each service can use different technologies
4. **Fault Tolerance**: Service failures are isolated
5. **Team Autonomy**: Different teams can work on different services

## Technologies Used

- **Backend**: Spring Boot 3.2.0, Spring Cloud 2023.0.0
- **Database**: H2 (in-memory for each service)
- **Security**: Spring Security 6.2.0, JWT
- **Service Discovery**: Netflix Eureka
- **API Gateway**: Spring Cloud Gateway
- **Documentation**: Swagger/OpenAPI 3
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
- **Build Tool**: Maven
- **Java Version**: 17

This implementation fully satisfies all requirements mentioned in the PDF document and provides a production-ready microservices architecture for a Play Store application.