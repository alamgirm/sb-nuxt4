# Spring Boot REST API with Azure AD Resource Server

This is a Spring Boot REST API that acts as a resource server for the Nuxt 4 frontend application. It uses Azure AD for authentication and authorization with custom scopes.

## Features

- **Java 21** with Spring Boot 3.2.0
- **Azure AD Integration** with OAuth2 Resource Server
- **JWT Token Validation** from Azure AD
- **CORS Configuration** for Nuxt 4 frontend
- **H2 Database** for development (in-memory)
- **RESTful APIs** with proper HTTP status codes
- **Data Validation** with Jakarta Validation
- **Sample Data** initialization

## Prerequisites

- Java 21
- Maven 3.6+
- Azure AD App Registration

## Setup

1. **Configure Azure AD App Registration**:
   - Create an Azure App Registration
   - Note down the Client ID and Tenant ID
   - Configure API permissions for your custom scope
   - Set up redirect URIs for your frontend

2. **Set Environment Variables**:
   ```bash
   export AZURE_TENANT_ID=your-tenant-id
   export AZURE_CLIENT_ID=your-client-id
   export AZURE_APP_ID_URI=api://your-client-id
   ```

3. **Run the Application**:
   ```bash
   mvn spring-boot:run
   ```

## API Endpoints

### Health Check
- `GET /api/health` - Health check endpoint (public)

### User Management
- `GET /api/users` - Get all users (requires `access_as_user` scope)
- `GET /api/users/me` - Get current user info (requires `access_as_user` scope)
- `GET /api/users/profile` - Get user profile (requires `access_as_user` scope)
- `GET /api/users/{id}` - Get user by ID (requires `access_as_user` scope)
- `POST /api/users` - Create user (requires `access_as_user` scope)
- `PUT /api/users/{id}` - Update user (requires `access_as_user` scope)
- `DELETE /api/users/{id}` - Delete user (requires `access_as_user` scope)

### Product Management
- `GET /api/products` - Get all products (requires `access_as_user` scope)
- `GET /api/products/active` - Get active products (requires `access_as_user` scope)
- `GET /api/products/category/{category}` - Get products by category (requires `access_as_user` scope)
- `GET /api/products/search?name={name}` - Search products (requires `access_as_user` scope)
- `GET /api/products/{id}` - Get product by ID (requires `access_as_user` scope)
- `POST /api/products` - Create product (requires `access_as_user` scope)
- `PUT /api/products/{id}` - Update product (requires `access_as_user` scope)
- `PUT /api/products/{id}/stock?quantity={qty}` - Update stock (requires `access_as_user` scope)
- `DELETE /api/products/{id}` - Delete product (requires `access_as_user` scope)

### Admin Endpoints
- `GET /api/admin/stats` - Get admin statistics (requires `access_as_user` scope)
- `GET /api/admin/users` - Get all users for admin (requires `access_as_user` scope)
- `GET /api/admin/system-info` - Get system information (requires `access_as_user` scope)

## Database

The application uses H2 in-memory database for development. You can access the H2 console at:
- URL: `http://localhost:8080/api/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`

## Configuration

### Application Properties
- Server runs on port `8080`
- Context path: `/api`
- CORS configured for `http://localhost:3000` (Nuxt 4 frontend)

### Security Configuration
- JWT tokens validated against Azure AD
- Custom scope `access_as_user` required for protected endpoints
- CORS enabled for frontend integration

## Testing with Frontend

1. Start the Spring Boot application
2. Start your Nuxt 4 frontend application
3. Login with Microsoft in the frontend
4. The frontend will automatically include the JWT token in API requests
5. Test the API endpoints through the frontend

## Sample Data

The application initializes with sample products:
- Laptop Pro 15 (Electronics)
- Wireless Mouse (Electronics)
- Office Chair (Furniture)
- Coffee Mug (Accessories)
- Standing Desk (Furniture)

## Development

### Running Tests
```bash
mvn test
```

### Building the Application
```bash
mvn clean package
```

### Running the JAR
```bash
java -jar target/sb-rest-0.0.1-SNAPSHOT.jar
```

## Integration with Nuxt 4

This API is designed to work seamlessly with the Nuxt 4 frontend:

1. **Authentication**: Uses the same Azure AD tenant and client ID
2. **CORS**: Configured to allow requests from `http://localhost:3000`
3. **JWT Validation**: Validates tokens issued by Azure AD
4. **Custom Scope**: Requires `access_as_user` scope for protected endpoints

The frontend can call these APIs using the `useApi` composable with the JWT token automatically included in the Authorization header.
