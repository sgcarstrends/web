# SGCarsTrends Development Guidelines

## Commands
- Build: `pnpm build`
- Dev: `pnpm dev`
- Lint: `pnpm lint`
- Test: `pnpm test`
- Test watch: `pnpm test:watch`
- Test single file: `pnpm test -- -t "test name"` or `pnpm test -- path/to/file.test.ts`
- E2E tests: `pnpm test:e2e`
- DB migrations: `pnpm migrate`

## Code Style
- TypeScript with strict type checking
- Imports ordered by: built-in > external > internal > parent > sibling
- React (Next.js) with functional components
- Tailwind CSS for styling (prettier-plugin-tailwindcss for class sorting)
- File naming: camelCase for utils, PascalCase for components
- Error handling: proper try/catch blocks with meaningful error messages
- Testing: Jest for unit tests, Playwright for E2E tests
- Use absolute imports with @ alias
- Follow ESLint rules configured in project

## Excluded Areas
- `components/ui/**` - This is shadcn/ui code which should not be modified