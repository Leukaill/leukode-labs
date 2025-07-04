# Arc Labs - Premium Web Development Agency

## Overview

Arc Labs is a modern web development agency website built with a full-stack architecture that replicates the Google ChromeOS design system. The application combines a React frontend with an Express backend, utilizing PostgreSQL for data storage and featuring advanced 3D animations, glassmorphism effects, and magnetic interactions.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom Google ChromeOS-inspired design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Animations**: GSAP for advanced animations and Three.js for 3D particle effects
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API with proper error handling

### Build System
- **Bundler**: Vite for development and production builds
- **Development**: Hot Module Replacement (HMR) with Vite middleware
- **Production**: ESBuild for server-side bundling
- **TypeScript**: Strict type checking across the entire codebase

## Key Components

### Database Schema
The application uses three main entities:
- **Users**: Authentication and user management
- **Projects**: Portfolio projects with metadata
- **Contact Submissions**: Client inquiries and project requests

### Frontend Components
- **3D Elements**: Particle backgrounds, floating logos, and holographic cards
- **Magnetic Interactions**: Buttons and cards with magnetic hover effects
- **Glassmorphism UI**: Translucent cards with backdrop blur effects
- **Responsive Design**: Mobile-first approach with ChromeOS-inspired breakpoints

### API Endpoints
- `GET /api/projects` - Retrieve all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create new project
- `POST /api/contact` - Submit contact form

## Data Flow

1. **Client Requests**: React components use TanStack Query for data fetching
2. **API Layer**: Express routes handle business logic and validation
3. **Database**: Drizzle ORM manages PostgreSQL interactions
4. **Response**: JSON data flows back through the API to update React state
5. **UI Updates**: Components re-render with new data using React's reconciliation

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **gsap**: Professional-grade animation library
- **three**: 3D graphics and particle systems

### UI Libraries
- **@radix-ui/***: Headless UI primitives for accessibility
- **tailwindcss**: Utility-first CSS framework
- **react-hook-form**: Performant form management
- **zod**: Schema validation for TypeScript

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- TypeScript compilation in watch mode
- In-memory storage fallback for development

### Production Build
1. **Frontend**: Vite builds React app to static assets
2. **Backend**: ESBuild bundles Express server
3. **Database**: Drizzle migrations handle schema updates
4. **Deployment**: Single Node.js process serves both API and static files

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment detection for development/production
- Build outputs to `dist/` directory for production deployment

## Changelog
- July 04, 2025. Initial setup
- July 04, 2025. Migration from Replit Agent to Replit environment completed
  - Created divine logo with orbital rings and sacred geometry
  - Fixed navigation button text visibility issues
  - Updated packages section with professional content and Heroicons
  - Preserved glassmorphism effects throughout the site
  - Improved services and why-us sections with professional icons and content
  - All sections now use clean, professional styling while maintaining visual appeal
- July 04, 2025. Major UI improvements and package system overhaul
  - Fixed navbar text color adaptation based on scroll position (white in hero, dark in content sections)
  - Removed all gradients except in hero section, using liquid glass transparency throughout
  - Fixed contact form text visibility (white text labels instead of invisible gray)
  - Made package cards fully clickable instead of separate "view details" buttons
  - Created comprehensive package detail pages with theme-based color schemes
  - Added professional content with guarantees, metrics, and compelling CTAs
  - Removed excessive animations for more professional appearance

## User Preferences

Preferred communication style: Simple, everyday language.
Prefers glassmorphism effects and divine-level visual design.
Wants professional content with exceptional visual quality.