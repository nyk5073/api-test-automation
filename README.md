# API Test Automation Framework

A robust API testing framework built with TypeScript, Jest, and Axios designed for comprehensive API test automation.

## Overview

This framework provides a structured approach to API testing with support for authentication, users, posts, and comments endpoints. It includes test reporting, environment configuration, and parallel test execution capabilities.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nyk5073/api-test-automation.git
   cd api-test-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

The framework uses environment variables for configuration. Create a `.env` file in the root directory with your own token:

```
# API Configuration
API_BASE_URL=https://gorest.co.in
API_VERSION=v1

# Authentication
AUTH_USERNAME=test_user
AUTH_PASSWORD=test_password
AUTH_TOKEN=get_your_own_token_from_goRest_site
#https://gorest.co.in/my-account/access-tokens

# Test Configuration
TEST_TIMEOUT=30000
TEST_RETRY_COUNT=3

# Environment
NODE_ENV=test
```

A test environment configuration is available in the `test-env` directory. You can apply it by running:

```bash
npm run pretest:env
```

## Available Scripts

The framework provides several npm scripts for different testing scenarios:

- **Run all tests:**
  ```bash
  npm test
  ```

- **Run specific test suites:**
  ```bash
  npm run test:auth     # Run authentication tests
  npm run test:users    # Run user endpoint tests
  npm run test:posts    # Run post endpoint tests
  npm run test:comments # Run comment endpoint tests
  ```

- **Run tests in watch mode:**
  ```bash
  npm run test:watch
  ```

- **Run tests with coverage reports:**
  ```bash
  npm run test:coverage
  ```

- **Run tests in parallel:**
  ```bash
  npm run test:parallel
  ```

- **Run tests in CI environment:**
  ```bash
  npm run test:ci
  ```

- **View coverage reports:**
  ```bash
  npm run report
  ```

- **Lint code:**
  ```bash
  npm run lint
  ```

## Project Structure

```
api-test-automation/
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── apiCalls/            # API call implementations
├── helpers/             # Helper functions and utilities
├── jest.config.js       # Jest configuration
├── jest.setup.js        # Jest setup file
├── package.json         # Project dependencies and scripts
├── test-env/            # Test environment configurations
├── test-results/        # Test execution results
├── tests/               # Test suites
│   ├── users/           # User endpoint tests
│   ├── posts/           # Post endpoint tests
└── tsconfig.json        # TypeScript configuration
```

## Tech Stack

- **TypeScript**: For type-safe code
- **Jest**: Testing framework
- **Axios**: HTTP client for API calls
- **ts-jest**: TypeScript preprocessor for Jest
- **dotenv**: Environment variable management
- **jest-junit**: JUnit reporter for CI integration

## Running Tests

Tests are organized by API domain (auth, users, posts, comments) and can be executed individually or as a complete suite.

Example of running a specific test:

```bash
# Run all user tests
npm run test:users

# Run a specific test file 
npx jest tests/users/get-user.test.ts
```

## Reporting

The framework generates test reports in various formats:

- Console output for local development
- JUnit XML reports for CI/CD integration
- HTML coverage reports accessible via `npm run report`

## License

ISC

