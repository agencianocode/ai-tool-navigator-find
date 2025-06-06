
# Testing Guide

## Overview
This project uses a comprehensive testing strategy with multiple layers of testing to ensure reliability and maintainability.

## Testing Stack
- **Unit Tests**: Vitest + React Testing Library
- **Integration Tests**: React Testing Library
- **E2E Tests**: Playwright
- **Performance Tests**: Lighthouse + Playwright

## Running Tests

### Unit and Integration Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run specific test file
npx playwright test dashboard.spec.ts
```

### Performance Tests
```bash
# Run performance tests
npm run test:performance
```

## Test Structure

### Unit Tests
Located in `src/components/**/__tests__/`
- Test individual component behavior
- Mock external dependencies
- Focus on component logic and rendering

### Integration Tests
Located in `src/test/integration/`
- Test component interactions
- Test with real providers
- Test data flow

### E2E Tests
Located in `tests/e2e/`
- Test complete user workflows
- Test across different browsers
- Test critical user paths

## Best Practices

1. **Write tests first** when implementing new features
2. **Keep tests simple** and focused on one thing
3. **Use descriptive test names** that explain what is being tested
4. **Mock external dependencies** in unit tests
5. **Test user behavior**, not implementation details
6. **Maintain test data** separate from test logic

## Continuous Integration
Tests run automatically on:
- Pull requests
- Pushes to main branch
- Scheduled runs for performance regression testing
