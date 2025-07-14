# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Build: `pnpm build` (uses Turbopack)
- Dev: `pnpm dev` (uses Turbopack)
- Lint: `pnpm lint`
- Test: `pnpm test:coverage` (Vitest with jsdom and coverage reporting)
- Test single file: `pnpm test -- path/to/file.test.ts`
- Test watch mode: `pnpm test:watch`
- E2E tests: `pnpm test:e2e` (Playwright)
- E2E tests UI: `pnpm test:e2e:ui`
- DB migrations: `pnpm migrate`

## Architecture Overview

### Tech Stack

- **Next.js 15** with App Router and React 19
- **TypeScript** with strict type checking
- **Tailwind CSS** (v4) with prettier-plugin-tailwindcss for class sorting
- **Drizzle ORM** with PostgreSQL (Neon Database)
- **Zustand** for state management with persistence
- **HeroUI** components for modern, professional UI (transitioning away from shadcn/ui)
- **Vitest** for unit tests, **Playwright** for E2E tests
- **SST** for AWS deployment with CloudFlare DNS

### Project Structure

- `src/app/` - Next.js App Router with route-based organization
- `src/components/` - React components (HeroUI + custom)
- `src/config/` - Database and application configuration
- `src/utils/` - Utility functions with comprehensive test coverage
- `src/types/` - TypeScript type definitions
- `src/schema/` - Drizzle database schema definitions

### Business Domain

Singapore car market analytics:

- Car registration data by make, fuel type, vehicle type
- COE (Certificate of Entitlement) bidding results and premiums
- Month-over-month and year-over-year trend analysis
- Geographic user analytics

### Key Patterns

#### State Management

- Zustand store with modular slices (COE, Date, Notification)
- Selective persistence with storage middleware
- URL state management via nuqs for shareable links

#### API Integration

- Custom `fetchApi` utility with authentication headers
- RESTful API endpoints in `src/app/api/`
- Upstash Redis for caching with Next.js revalidation tags

#### Data Visualisation

- **Chart Types**: AreaChart, BarChart, DonutChart, LineChart for analytics
- **Responsive design** with mobile-first approach
- **Custom tooltips** and interactive features for enhanced UX
- **Performance**: Use dynamic imports for chart components to reduce bundle size
- **Migration**: Gradually migrate existing Recharts components to Tremor equivalents

## Code Style

- File naming: kebab-case for utils and components
- Import order: built-in > external > internal > parent > sibling
- React functional components with TypeScript
- Error handling: try/catch blocks with meaningful messages
- Absolute imports with `@/` alias
- Follow ESLint rules configured in project
- Use British English spelling
- Prefer HeroUI components for new features and refactoring
- Use HeroUI's TypeScript-first approach with proper component typing
- Leverage HeroUI's professional design system for analytics dashboard components

## Testing

- Unit tests: Vitest with jsdom environment, @testing-library/react
- E2E tests: Playwright (Chromium only)
- Test files excluded from Vitest: `tests/` directory (reserved for E2E)
- Setup file: `setup-tests.ts`
- **Focus on basic functionality testing only** - test core component behaviour, prop handling, and essential user
  interactions rather than comprehensive edge cases
- **Write tests to increase code coverage** - prioritise coverage of untested components and utilities, but keep tests
  simple and focused on core functionality

## Database

- Drizzle ORM with type-safe queries
- Simple analytics schema for page views and geolocation
- Migrations managed via drizzle-kit

## Deployment

- SST on AWS with ARM64 architecture
- Environment-specific configurations (dev/staging/prod)
- Lambda warming to reduce cold starts

## UI Component Strategy

The codebase uses HeroUI as the primary component library:

- **New Features**: Use HeroUI components with TypeScript-first approach
- **Component Selection**: Leverage HeroUI's professional design system for analytics interfaces
- **Data Visualisation**: Utilise HeroUI's advanced table and chart components for market data
- **Customisation**: Apply HeroUI's theming system to match Singapore car market branding
- **Performance**: Take advantage of HeroUI's tree-shakeable, optimised components
- **Legacy Code**: Gradually migrate existing shadcn/ui components to HeroUI equivalents
- **DaisyUI Removal**: Remove DaisyUI dependency once HeroUI migration is completed

## Excluded Areas

- `components/ui/**` - shadcn/ui code (avoid enhancing, prefer replacing during refactors)

## Development Guidelines

- DO NOT build the project after making changes