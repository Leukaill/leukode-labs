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
- July 04, 2025. Mobile optimization and responsive design improvements
  - Optimized text sizes across all breakpoints for better mobile readability
  - Implemented progressive scaling for headings (text-3xl sm:text-4xl md:text-5xl lg:text-6xl)
  - Reduced logo sizes on mobile devices with conditional rendering
  - Adjusted section padding for mobile (py-20 md:py-32)
  - Improved grid layouts for better mobile stacking (sm:grid-cols-2 lg:grid-cols-3)
  - Enhanced icon and button sizes for touch-friendly mobile interactions
- July 04, 2025. Dynamic island navigation and search functionality
  - Implemented mobile dynamic island navigation spanning full screen width
  - Added comprehensive search functionality for packages and portfolio projects
  - Integrated black search and hamburger icons as requested
  - Added keyboard shortcuts (Ctrl/Cmd + K) for quick search access
  - Created responsive search modal with real-time filtering
  - Maintained separate desktop and mobile navigation layouts
- July 04, 2025. Enhanced service and why-us sections with detailed modal popups
  - Created comprehensive service modals with features, benefits, process, timeline, and investment details
  - Built why-us modals showcasing achievements, metrics, and client benefits
  - Added luxurious presentation with glassmorphism modal design
  - Implemented click-to-explore functionality for deeper engagement
  - Professional pricing and timeline information without technical justifications
- July 04, 2025. Luxurious portfolio showcase implementation
  - Built dedicated portfolio showcase page with sophisticated dark theme
  - Implemented category filtering system for organized browsing
  - Created grid-based layout optimized for visual impact
  - Removed technical stack information for clean, luxury brand presentation
  - Added smooth animations and hover effects without excessive motion
  - Connected "Explore All Impossibilities" button to dedicated showcase page
- July 04, 2025. Individual project detail pages and dynamic serving
  - Created comprehensive project detail pages with dynamic JS serving for resource efficiency
  - Added detailed project information including challenges, solutions, results, and metrics
  - Implemented professional testimonials and case study format
  - Connected portfolio showcase cards to individual project pages
  - Added comprehensive project data with realistic metrics and client feedback
- July 04, 2025. Modal popup polishing and luxury design enhancement
  - Completely redesigned service and why-us modals with luxurious glassmorphism styling
  - Enhanced headers with gradient backgrounds and premium visual indicators
  - Improved content layout with structured sections and visual hierarchy
  - Added professional gradient accents and improved typography
  - Maintained professional restraint without excessive animations as requested
- July 04, 2025. Newsletter subscription and About Us implementation
  - Created sophisticated newsletter subscription modal with professional styling
  - Built comprehensive About Us page emphasizing luxury and mystery without team exposure
  - Added newsletter and About options to both desktop and mobile navigation
  - Integrated newsletter subscription in footer with modal functionality
  - Designed About page with philosophy, values, and legacy sections while maintaining brand mystery
- July 07, 2025. Rwanda market optimization and comprehensive feature enhancement
  - Updated project pricing to reflect realistic Rwanda market trends ($1,200-$12,000 range)
  - Optimized performance by reducing heavy GSAP animations for better device compatibility
  - Implemented dynamic island animations for both mobile and desktop navigation
  - Added Google Reviews widget with authentic Rwanda-based client testimonials
  - Integrated interactive location map modal with Rwanda office location
  - Updated all contact information to lucienshungofficial@gmail.com and +250798516334
  - Enhanced glassmorphism effects throughout the site for luxury appeal
  - Created comprehensive testimonials section with rotating client feedback
- July 07, 2025. Firebase integration and data migration
  - Integrated Firebase with complete configuration (leukail-tech project)
  - Migrated all data storage from memory to Firebase Firestore
  - Implemented Firebase Admin SDK for server-side operations
  - Created comprehensive Firebase storage layer with error handling
  - Set up automatic sample data initialization in Firebase
  - Maintained all existing API endpoints with Firebase backend
- July 07, 2025. Comprehensive admin dashboard implementation
  - Created full-featured admin dashboard accessible at /admin (hidden from public navigation)
  - Implemented comprehensive project management with create, edit, delete, and bulk operations
  - Built advanced analytics panel with real-time metrics, country data, and activity tracking
  - Added SEO management system with meta tags, Open Graph, schema markup, and keyword ranking
  - Created bulk operations panel for mass project updates, exports, and feature management
  - Integrated contact inquiries management with detailed client information display
  - Added server-side API routes for PUT and DELETE operations on projects
  - Enhanced storage interfaces to support update and delete functionality across Firebase and fallback storage
  - Performance-focused UI with tabbed interface while maintaining luxury glassmorphism aesthetic
- July 07, 2025. Luxury authentication system implementation
  - Built single admin authentication system with Firestore storage and one-admin restriction
  - Created luxury login page at /admin/login with glassmorphism design and particle effects
  - Added self-registration system at /admin/register with automatic admin existence checks
  - Implemented secure JWT token authentication with cookie-based session management
  - Added protected route system preventing unauthorized admin access
  - Fixed Firebase storage project creation issue with proper numeric ID generation
  - Integrated logout functionality in admin dashboard header with user identification
  - System enforces only one admin account allowed with automatic registration blocking
- July 07, 2025. Impressive tech slideshow hero section implementation
  - Created luxurious animated slideshow featuring three professional web development images
  - Implemented smooth crossfade transitions with 5-second intervals between slides
  - Added sophisticated overlay system with gradient and scan line effects for tech aesthetic
  - Preserved all existing hero text while enhancing visibility with white text and drop shadows
  - Integrated slide indicators with interactive navigation at bottom of hero
  - Maintained particle effects and gradient orbs layered above slideshow for depth
  - Enhanced visual hierarchy with proper z-index layering for optimal presentation

## User Preferences

Preferred communication style: Simple, everyday language.
Prefers glassmorphism effects and divine-level visual design.
Wants professional content with exceptional visual quality.
Prioritizes performance optimization for all devices and reduced animations.
Prefers Rwanda market-appropriate pricing and local business focus.
Values authentic client testimonials and interactive location features.