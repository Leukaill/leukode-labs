# Leukode Labs - Premium Web Development Agency

## Overview
Leukode Labs is a modern web development agency website that replicates the Google ChromeOS design system, offering premium web development services. It features a full-stack architecture with a React frontend, Express backend, and PostgreSQL database, emphasizing advanced 3D animations, glassmorphism effects, and magnetic interactions. The project aims to provide professional web solutions with a focus on luxury design and performance, tailored for markets like Rwanda, showcasing exceptional visual quality and user experience.

## User Preferences
Preferred communication style: Simple, everyday language.
Prefers glassmorphism effects and divine-level visual design.
Wants professional content with exceptional visual quality.
Prioritizes performance optimization for all devices and reduced animations.
Prefers Rwanda market-appropriate pricing and local business focus.
Values authentic client testimonials and interactive location features.

## System Architecture
The application is built with a full-stack architecture, featuring a React 18 frontend with TypeScript, styled using Tailwind CSS and Radix UI/shadcn/ui, managing state with TanStack Query, and routing with Wouter. Animations are handled by GSAP and Three.js, with forms validated by React Hook Form and Zod. The backend utilizes Node.js with Express.js and TypeScript, using PostgreSQL with Drizzle ORM for data persistence and Express sessions for session management, exposing a RESTful API. The build system relies on Vite for bundling and development, with ESBuild for production server builds.

Key architectural decisions include:
- **UI/UX**: Google ChromeOS-inspired design, glassmorphism effects, 3D elements (particle backgrounds, holographic cards), magnetic interactions, responsive design with mobile-first approach.
- **Frontend Features**: Dynamic island navigation, comprehensive search functionality (Ctrl/Cmd + K), detailed service and 'why-us' modals, luxurious portfolio showcase with category filtering, individual project detail pages, newsletter subscription, and an About Us section.
- **Backend Features**: RESTful API for managing projects and contact submissions, robust error handling, and secure authentication.
- **Admin Dashboard**: A comprehensive, hidden admin dashboard (`/admin`) for project management (CRUD, bulk operations), analytics, SEO management, and contact inquiry management.
- **Authentication**: Single admin authentication system using Firestore, with a luxury login page and secure JWT token-based session management.
- **Hero Section**: Animated slideshow with professional web development images, smooth crossfade transitions, and sophisticated overlay effects.

## External Dependencies

### Core Technologies
- `@neondatabase/serverless`: PostgreSQL database connection
- `drizzle-orm`: Type-safe database ORM
- `@tanstack/react-query`: Server state management
- `gsap`: Professional-grade animation library
- `three`: 3D graphics and particle systems
- `firebase`: Backend services including Firestore for data storage and Firebase Admin SDK.

### UI Libraries
- `@radix-ui/*`: Headless UI primitives for accessibility
- `tailwindcss`: Utility-first CSS framework
- `react-hook-form`: Performant form management
- `zod`: Schema validation for TypeScript

### Development Tools
- `vite`: Fast build tool and development server
- `typescript`: Static type checking
- `tsx`: TypeScript execution for Node.js