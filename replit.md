# Station Performance Dashboard

## Overview
This is a Vite + React + TypeScript dashboard application imported from GitHub (Lovable project). It features a comprehensive performance metrics dashboard for development teams with team statistics, individual developer metrics, and trend analysis.

## Tech Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Language**: TypeScript 5.8.3
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack React Query 5.83.0
- **Charts**: Recharts 2.15.4
- **Form Handling**: React Hook Form with Zod validation

## Project Structure
```
/
├── src/
│   ├── components/
│   │   ├── dashboard/     # Dashboard-specific components
│   │   └── ui/           # shadcn UI components
│   ├── data/             # Mock data for dashboard
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
└── index.html           # HTML template
```

## Configuration

### Vite Configuration
- **Dev Server**: Port 5000, Host 0.0.0.0 (configured for Replit)
- **Preview Server**: Port 5000, Host 0.0.0.0 (configured for deployment)
- **HMR**: Configured with client port 5000 for Replit proxy compatibility
- **Path Alias**: `@` → `./src`

### Workflow
- **Name**: Start application
- **Command**: `npm run dev`
- **Port**: 5000
- **Output Type**: webview

### Deployment
- **Type**: autoscale (stateless frontend)
- **Build Command**: `npm run build`
- **Run Command**: `npm run preview`

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features
- **Global Dashboard View**: Overview metrics and team performance
- **Team View**: Detailed team statistics and comparisons
- **Individual View**: Developer performance metrics
- **Trends View**: Historical data and trend analysis
- **Responsive Design**: Mobile-friendly layout
- **Dark/Light Theme Support**: Using next-themes
- **Real-time Alerts**: Performance monitoring alerts

## Recent Changes
- **2025-10-01**: Initial Replit setup
  - Configured Vite to use port 5000 and host 0.0.0.0
  - Set up workflow for frontend development
  - Configured deployment settings for autoscale
  - Installed all npm dependencies

## Notes
- This is a frontend-only application with mock data
- No backend or database required
- Uses in-memory data from `src/data/mockData.ts`
