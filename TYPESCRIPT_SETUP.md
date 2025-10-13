# TypeScript Setup for Liveparte Frontend

This document outlines the TypeScript setup that has been added to the Liveparte frontend project.

## What Was Added

### 1. TypeScript Configuration
- **`tsconfig.json`**: Main TypeScript configuration with Next.js optimizations
- **`next-env.d.ts`**: Next.js type definitions
- **`.eslintrc.json`**: ESLint configuration for TypeScript

### 2. Type Definitions
- **`src/types/index.ts`**: Core application types (User, Event, API responses, etc.)
- **`src/types/store.ts`**: Redux store and state types
- **`src/types/components.ts`**: React component prop types

### 3. TypeScript Dependencies
Added to `package.json`:
- `@types/node`: Node.js type definitions
- `@types/react`: React type definitions
- `@types/react-dom`: React DOM type definitions
- `@types/js-cookie`: js-cookie type definitions
- `@types/crypto-js`: crypto-js type definitions

### 4. Converted Files
- **`src/pages/_app.tsx`**: Main app wrapper with TypeScript
- **`src/pages/index.tsx`**: Home page with TypeScript
- **`src/pages/event/index.tsx`**: Event listing page with TypeScript
- **`src/api/auth/[...nextauth]/route.ts`**: NextAuth configuration with TypeScript
- **`src/store/index.ts`**: Redux store with TypeScript
- **`src/store/User/index.ts`**: User slice with TypeScript
- **`src/components/Ui/Button.tsx`**: Example Button component with TypeScript

## Key Features

### 1. Path Mapping
All imports use the `@/` alias for cleaner imports:
```typescript
import { Event, User } from '@/types';
import { selectCurrentUserData } from '@/store/User';
```

### 2. Type Safety
- Strict type checking for Redux state
- Typed API responses
- Component prop validation
- Event and User data structures

### 3. Redux Integration
- Typed selectors and actions
- RTK Query integration with TypeScript
- Redux Persist compatibility

### 4. Next.js Integration
- App-level type definitions
- Page component typing
- API route typing

## Available Scripts

```bash
# Type checking
yarn type-check

# Type checking in watch mode
yarn type-check:watch

# Development server (works with both .js and .tsx files)
yarn dev

# Build (TypeScript errors will prevent build)
yarn build
```

## Migration Strategy

### Phase 1: Gradual Migration (Current)
- New files should be created as `.tsx` or `.ts`
- Existing `.js` files continue to work
- TypeScript checking is enabled but not strict

### Phase 2: Full Migration (Future)
- Convert all `.js` files to `.tsx`/`.ts`
- Enable strict TypeScript checking
- Add comprehensive type coverage

## Type Definitions Overview

### Core Types
```typescript
interface User {
  _id: string;
  email: string;
  name: string;
  profilePicture?: string;
  // ... other fields
}

interface Event {
  _id: string;
  name: string;
  description: string;
  event_date: string;
  event_length: number;
  streaming_url?: string;
  isLiveStreamed: boolean;
  // ... other fields
}
```

### Redux Types
```typescript
interface RootState {
  auth: AuthState;
  event: EventState;
  setting: SettingsState;
}
```

### Component Types
```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  // ... other props
}
```

## Benefits

1. **Better IDE Support**: Autocomplete, refactoring, and error detection
2. **Catch Errors Early**: Type checking at compile time
3. **Better Documentation**: Types serve as living documentation
4. **Easier Refactoring**: Safe renaming and restructuring
5. **Team Collaboration**: Clear interfaces and contracts

## Next Steps

1. **Convert More Components**: Gradually convert existing components to TypeScript
2. **Add API Types**: Define comprehensive API response types
3. **Enable Strict Mode**: Once all files are converted, enable strict TypeScript checking
4. **Add Tests**: TypeScript makes testing more reliable
5. **Documentation**: Use TypeScript types to generate API documentation

## Troubleshooting

### Common Issues
1. **Import Errors**: Make sure path mapping is correct (`@/` prefix)
2. **Type Errors**: Check if types are properly defined in `src/types/`
3. **Redux Errors**: Ensure selectors and actions are properly typed
4. **Component Props**: Verify prop types match component definitions

### Getting Help
- Check TypeScript errors in terminal: `yarn type-check`
- Use IDE TypeScript features for better error messages
- Refer to existing typed files as examples
