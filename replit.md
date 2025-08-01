# replit.md

## Overview

Suntyn AI is a full-stack neural intelligence platform offering 80+ AI-powered tools across PDF processing, image editing, media conversion, and government document validation. It features animated sun-based branding with neural network visuals and AI-enhanced user interfaces, aiming to provide TinyWow-level heavy processing and real file generation. The project envisions a comprehensive AI toolkit with broad market appeal.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript via Vite
- **UI Library**: Custom component library based on Radix UI primitives and shadcn/ui
- **Styling**: Tailwind CSS with CSS variables for theming and dark mode
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Lightweight Node.js server (Express.js permanently removed as of July 2025)
- **Server**: Custom HTTP server serving React frontend and API endpoints
- **Port**: 5000 (unified frontend + backend)
- **API Endpoints**: 
    - Health check: `/api/health`
    - Tools API: `/api/tools`
    - Static files: Served from `dist/public`
- **Communication**: Direct HTTP API serving; SPA routing for frontend
- **Processing**: FastAPI microservices architecture for heavy processing (PDF, Image, Media, Government, Developer tools)
- **Authentication**: JWT token-based authentication with bcryptjs for hashing
- **Session Storage**: In-memory with PostgreSQL fallback
- **Migration Status**: Express.js completely removed (July 31, 2025). Frontend builds properly to dist/public and served correctly.
- **Persistence System**: Added .replit-persistent configuration to maintain settings across imports/resets
- **Upload/Download**: Robust file handling with security validation, 50MB limit, proper error handling
- **Error Resolution**: Fixed ERR_HTTP_HEADERS_SENT issue with safe header handling
- **Tool Processing**: All 80+ tools working correctly with proper API endpoints and fallback responses (August 1, 2025)
- **Microservices**: FastAPI services configured for PDF, Image, Media, Government, and Developer tools

### Data Storage Solutions
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured with @neondatabase/serverless)
- **Schema**: Shared definitions in `/shared/schema.ts`
- **Migrations**: Managed through Drizzle Kit

### UI/UX Decisions
- Animated sun-based branding with neural network visual elements.
- AI-enhanced user interfaces with consistent styling via Tailwind CSS.
- Dark mode support with smooth transitions.
- Responsive design with a mobile-first approach.
- Comprehensive component library built on Radix UI.

### System Design Choices
- Monorepo structure for client, server, and shared code.
- Automatic file cleanup with 1-hour TTL for temporary files.
- Comprehensive error handling with logging, retry mechanisms, and user-friendly messages.
- Production-ready security middleware (CSP, rate limiting, CORS, XSS protection).
- Optimized performance with lazy loading, font optimization, and caching.

## External Dependencies

- **UI/UX**: Radix UI, TanStack Query, Wouter, class-variance-authority
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Authentication**: bcryptjs, jsonwebtoken
- **Validation**: Zod, @hookform/resolvers
- **Styling**: Tailwind CSS
- **Media Processing**: Cloudinary (for advanced media processing)
- **Backend Framework**: FastAPI, uvicorn, python-multipart
- **PDF Processing**: PyPDF2, ReportLab
- **Image Processing**: Pillow (PIL)
- **Deployment**: Firebase (for frontend hosting), Render.com (for backend deployment considerations)
- **Database/Auth Backend (alternative/integrated)**: Supabase
```