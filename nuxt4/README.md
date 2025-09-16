# Nuxt 4 MSAL Sample Application

This is a sample application demonstrating Microsoft Authentication Library (MSAL) 4 integration with Nuxt 4, including custom scopes for API access.

## Features

- Microsoft Authentication Library (MSAL) 4 integration
- Custom scope configuration for API access
- Protected routes with authentication middleware
- API service for making authenticated requests
- Modern UI with Tailwind CSS
- TypeScript support
- Component-based architecture

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your Azure App Registration:
   - Create an Azure App Registration in the Azure Portal
   - Note down the Client ID and Tenant ID
   - Configure redirect URIs (e.g., `http://localhost:3000`)
   - Add API permissions for your custom scope

3. Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

4. Update the `.env` file with your Azure App Registration details:
```
NUXT_PUBLIC_MSAL_CLIENT_ID=your-azure-app-client-id
NUXT_PUBLIC_MSAL_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
NUXT_PUBLIC_MSAL_REDIRECT_URI=http://localhost:3000
NUXT_PUBLIC_MSAL_API_SCOPE=api://your-api-client-id/access_as_user
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

### Core Files
- `app.vue` - Main application component with auth initialization
- `nuxt.config.ts` - Nuxt 4 configuration with Tailwind CSS and app directory
- `package.json` - Dependencies including MSAL 4

### App Directory Structure (Nuxt 4)
- `app/` - Main application directory

### Authentication
- `app/plugins/msal.client.ts` - MSAL 4 configuration and initialization
- `app/composables/useAuth.ts` - Authentication composable with TypeScript types
- `app/middleware/auth.ts` - Authentication middleware for protected routes

### Components
- `app/components/AppLayout.vue` - Main application layout
- `app/components/LoginForm.vue` - Login form component
- `app/components/ApiTest.vue` - API testing component

### Pages
- `app/pages/index.vue` - Home page
- `app/pages/login.vue` - Login page
- `app/pages/protected.vue` - Protected page with user info and API testing

### API & Utils
- `app/composables/useApi.ts` - API service for authenticated requests
- `server/api/health.get.ts` - Health check API endpoint
- `app/utils/auth.ts` - Authentication utility functions
- `app/types/index.ts` - TypeScript type definitions

## Usage

1. Navigate to `http://localhost:3000`
2. Click "Login with Microsoft" to authenticate
3. After successful authentication, you'll be redirected to the protected page
4. Use the "Test API Call" button to test your custom scope API access

## Customizing

- Update the API endpoint in `components/ApiTest.vue` to point to your protected API
- Modify the scopes in `composables/useAuth.ts` as needed
- Customize the UI by modifying the Vue components
- Add new API endpoints in the `server/api/` directory
