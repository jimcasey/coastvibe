# CoastVibe Development Guide

## Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fixing
- `pnpm format` - Format all files with Prettier

## Code Style Guidelines

- **TypeScript**: Use strict typing, use interfaces for object shapes
- **Functions**: Use arrow functions instead of `function` keyword
- **Exports**: Do not use default exports, use named exports
- **Modules**: Use index files in folders for cleaner imports
- **Formatting**:
  - Single quotes, no semicolons, trailing commas
  - 2 space indentation
- **Components**:
  - Use React functional components with TS interfaces for props
  - Include 'use client' directive for client components
- **Naming**:
  - PascalCase for components, interfaces, and types
  - camelCase for variables, functions, and instances
- **Error Handling**: Use try/catch and throw with descriptive messages
- **File Structure**: Group related components in subdirectories
- **Imports**: Group and sort imports by external/internal

## Project Notes

- Investment data stored in `src/app/data/investmentData.json` (not in git)
- Uses Next.js, TypeScript, Ant Design, and React 19
