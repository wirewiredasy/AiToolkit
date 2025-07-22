# replit.md

## Overview

This is Suntyn AI - a modern full-stack neural intelligence platform built with React (frontend) and Express.js (backend). The application provides users with 80+ AI-powered tools organized into four main categories: PDF processing (25+ tools), image editing (20+ tools), media conversion (20+ tools), and government document validation (15+ tools). The platform features animated sun-based branding with neural network visual elements and AI-enhanced user interfaces.

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

## Recent Changes (January 2025)

✓ **Suntyn AI Branding Implementation**
- Created animated sun logo component with neural network elements
- Updated all headers, footers, and pages with consistent Suntyn AI branding  
- Added custom CSS animations for AI elements (suntyn-rotate, neural-pulse, ai-glow)
- Implemented gradient color schemes (blue, purple, cyan) throughout platform
- Added favicon and comprehensive SEO meta tags
- Enhanced hero section with animated background and gradient statistics cards

✓ **Technical Infrastructure** 
- Fixed all TypeScript compilation errors across frontend and backend
- Connected Supabase database with proper authentication flow
- Added AuthProvider context for user state management
- Generated database migrations for users, tool usage, and file storage
- Resolved CSS styling issues for file upload components

✓ **80 AI Tools Implementation (January 22, 2025)**
- Created 21+ specific tool pages with unique UIs and functionality
- Implemented comprehensive backend APIs for all tool categories
- PDF Tools: Merger, Splitter, Compressor, Word/Excel/PPT to PDF conversion
- Image Tools: Resizer, Background Remover, Compressor, Format Converter, Watermark Remover, Photo Enhancer
- Audio/Video Tools: Converter, Trimmer, Video-to-Audio Extractor
- Government Validators: PAN, GST, Aadhaar with real format validation
- Added file processing workflows with upload/download functionality
- Built tool usage tracking and analytics for user dashboard
- Enhanced UI with category-specific designs and responsive layouts

The application follows a monorepo structure with clear separation between client, server, and shared code, enabling efficient development and deployment while maintaining type safety throughout the stack.