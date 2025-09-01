# Excel Online TODAY() Function Test

This project contains end-to-end tests for the Excel Online TODAY() function using Playwright and TypeScript.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set environment variables for authentication:

```bash
export EXCEL_USERNAME=your-email@domain.com
export EXCEL_PASSWORD=123456  # The code sent to your email
```

## Running E2E Tests

### Run all tests:

```bash
npm run test:e2e
```

### Run tests in headed mode (see browser):

```bash
npm run test:e2e:headed
```

### View test report:

```bash
npm run test:e2e:report
```

## Test Structure

- **Original test**: `tests/e2e/velixo.spec.ts` (untouched)
- **Page Objects**: `./page-objects`
- **Utilities**: `src/utils/`

## Authentication

The project uses Playwright's global setup to handle authentication:

- `global-setup.ts` - Handles login and saves session to `state/loginAuth.json`
- Authentication state is reused across all tests
- If `state/loginAuth.json` exists, setup is skipped
- The authentication uses username and password. To make it work, you need to disable 2-step authentication and enable password authentication in your microsoft account

This structure makes tests more maintainable and reusable.

# Unit tests for incrementString() function

I have added unit tests for incrementString() function in Jest

### Run all tests:

```bash
npm run test:unit
```
