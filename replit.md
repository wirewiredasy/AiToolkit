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
- **Framework**: FastAPI with Python 3.11, structured as microservices
- **Microservices**:
    - Main Gateway (Port 5000): Routes requests
    - PDF Service (Port 8001): PDF processing, professional document generation
    - Image Service (Port 8002): Image editing, real PNG/JPEG output
    - Media Service (Port 8003): Audio/video tools, MP3/MP4 containers
    - Government Service (Port 8004): Document validation, official certificates
    - Developer Service (Port 8005): Developer utilities, formatted outputs
- **Communication**: HTTP API between frontend/gateway; internal service routing
- **Processing**: Designed for heavy processing (2-3 seconds) with real file generation.
- **Authentication**: JWT token-based authentication with bcryptjs for hashing.
- **Session Storage**: In-memory with PostgreSQL fallback.

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