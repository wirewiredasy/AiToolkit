# replit.md

## Overview

This is a modern full-stack web application built with React (frontend) and Express.js (backend) that serves as an AI-powered toolkit platform. The application provides users with access to multiple online tools organized into different categories like PDF processing, image editing, media conversion, and government document validation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Custom component library based on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with CSS variables for theming and dark mode support
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Authentication**: JWT-based authentication with bcryptjs for password hashing
- **Development**: Hot reloading with Vite middleware integration
- **Session Management**: Express sessions for user state

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured with @neondatabase/serverless for cloud deployment)
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Migrations**: Managed through Drizzle Kit with migrations stored in `/migrations`

### Authentication and Authorization
- **Strategy**: JWT token-based authentication
- **Password Security**: bcryptjs for password hashing
- **Middleware**: Custom authentication middleware for protected routes
- **Session Storage**: In-memory storage with fallback to PostgreSQL sessions

## Key Components

### Database Schema
The application defines three main entities:
1. **Users**: Basic user information with email, password, and name
2. **Tool Usage**: Tracking user interactions with tools including processing time, success status, and metadata
3. **User Files**: File management with automatic expiration (1-hour TTL) for security

### Authentication System
- Signup/login endpoints with validation
- JWT token generation and verification
- Protected route middleware
- User context management on frontend

### Tool Management
- Organized toolkit structure with categories (PDF, Image, Media, Government)
- Individual tools within each toolkit
- Usage tracking and statistics
- File upload and processing capabilities

### UI Components
- Comprehensive component library built on Radix UI
- Responsive design with mobile-first approach
- Dark mode support through CSS variables
- Consistent styling with Tailwind CSS

## Data Flow

1. **User Registration/Login**: Users authenticate via JWT tokens stored in localStorage
2. **Tool Access**: Authenticated users can access various tools organized by category
3. **File Processing**: Users upload files, which are temporarily stored and processed
4. **Usage Tracking**: All tool interactions are logged for analytics and user dashboard
5. **File Cleanup**: Temporary files are automatically deleted after 1 hour

## External Dependencies

### Production Dependencies
- **UI/UX**: Radix UI components, TanStack Query, Wouter routing
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Authentication**: bcryptjs, jsonwebtoken
- **Validation**: Zod with Drizzle integration
- **Styling**: Tailwind CSS, class-variance-authority

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across frontend, backend, and shared code
- **Development**: Hot reloading, error overlay, runtime error modal

## Deployment Strategy

### Build Process
- Frontend builds to `/dist/public` directory
- Backend bundles with esbuild to `/dist/index.js`
- Shared types and schemas available to both frontend and backend

### Environment Configuration
- Database URL required via `DATABASE_URL` environment variable
- JWT secret configurable via `JWT_SECRET` environment variable
- Development/production mode switching via `NODE_ENV`

### Hosting Considerations
- Designed for Replit deployment with specific plugins and configurations
- Static file serving handled by Express in production
- Database migrations managed through Drizzle Kit commands

The application follows a monorepo structure with clear separation between client, server, and shared code, enabling efficient development and deployment while maintaining type safety throughout the stack.