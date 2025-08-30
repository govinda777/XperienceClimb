# Testing Guide - XperienceClimb

This document provides comprehensive information about the testing strategy and implementation for the XperienceClimb project.

## 🧪 Testing Strategy

Our testing approach follows a multi-layered strategy:

1. **Unit Tests** - Test individual components, hooks, and utilities in isolation
2. **BDD Tests** - Behavior-driven development tests using Cucumber.js for user scenarios
3. **Integration Tests** - Test component interactions and data flow
4. **E2E Tests** - End-to-end testing with Playwright (existing)

## 📁 Test Structure

```
src/
├── __tests__/                    # Global test utilities
│   └── test-utils.tsx
├── components/
│   └── **/__tests__/            # Component unit tests
├── hooks/
│   └── __tests__/               # Hook unit tests
├── lib/
│   └── __tests__/               # Utility function tests
├── store/
│   └── __tests__/               # Store/state management tests
└── tests/
    └── bdd/                     # BDD tests
        ├── features/            # Feature files (.feature)
        ├── steps/               # Step definitions
        └── support/             # Test support files
```

## 🚀 Running Tests

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test pattern
npm run test:unit
```

### BDD Tests

```bash
# Run all BDD tests
npm run test:bdd

# Run BDD tests in watch mode
npm run test:bdd:watch

# Run all tests (unit + BDD)
npm run test:all
```

### Pre-commit Tests

```bash
# Run tests optimized for pre-commit hooks
npm run test:pre-commit
```

## 📋 Test Coverage

Our tests cover the following areas:

### Unit Tests

#### Hooks
- ✅ `useAuth` - Authentication state management
- ✅ `usePackages` - Package data fetching and management
- ✅ `useCartStore` - Shopping cart state management

#### Components
- ✅ `AuthGuard` - Authentication protection
- ✅ `LoginButton` - Authentication UI component
- ✅ `CartButton` - Cart interaction component
- ✅ `CartModal` - Cart display and management
- ✅ `CheckoutForm` - Checkout process component

#### Utilities
- ✅ `utils.ts` - Utility functions (formatting, validation, etc.)

### BDD Features

#### Authentication (`authentication.feature`)
- User login/logout flow
- Authentication state persistence
- User preferences management

#### Package Browsing (`package-browsing.feature`)
- Package listing and filtering
- Package details viewing
- Availability checking
- Pricing display

#### Shopping Cart (`shopping-cart.feature`)
- Adding/removing items
- Quantity management
- Cart persistence
- Cart calculations

#### Checkout Process (`checkout-process.feature`)
- Payment method selection
- Form validation
- Coupon application
- Order confirmation

## 🛠 Test Configuration

### Jest Configuration

The project uses Jest with the following key configurations:

- **Environment**: `jsdom` for DOM testing
- **Setup**: Custom setup file with mocks for external dependencies
- **Coverage**: Configured to collect from `src/` directory
- **Module Mapping**: Path aliases configured (`@/` → `src/`)

### Cucumber Configuration

BDD tests use Cucumber.js with:

- **TypeScript Support**: Via `ts-node/register`
- **Step Definitions**: Organized by feature area
- **World Object**: Custom world for test state management
- **Reporting**: JSON and HTML reports generated

## 🎯 Testing Best Practices

### Unit Tests

1. **Isolation**: Each test should be independent
2. **Mocking**: Mock external dependencies and side effects
3. **Coverage**: Aim for high coverage but focus on critical paths
4. **Naming**: Use descriptive test names that explain the scenario

### BDD Tests

1. **Gherkin Syntax**: Use clear, business-readable language
2. **Scenarios**: Focus on user journeys and business value
3. **Step Reuse**: Create reusable step definitions
4. **Data Management**: Use the World object for test state

### General Guidelines

1. **AAA Pattern**: Arrange, Act, Assert
2. **Single Responsibility**: One assertion per test when possible
3. **Error Cases**: Test both happy path and error scenarios
4. **Performance**: Keep tests fast and reliable

## 🔧 Mock Strategy

### External Dependencies

- **Privy Authentication**: Mocked for consistent test behavior
- **Next.js Router**: Mocked navigation functions
- **LocalStorage**: Mocked browser storage
- **Fetch API**: Mocked HTTP requests

### Component Dependencies

- **UI Components**: Simplified mocks for testing logic
- **Icons**: Simple test-friendly replacements
- **Third-party Libraries**: Mocked to avoid external dependencies

## 📊 Test Reports

Test reports are generated in the `reports/` directory:

- **Jest Coverage**: `reports/coverage/`
- **Cucumber JSON**: `reports/cucumber_report.json`
- **Cucumber HTML**: `reports/cucumber_report.html`

## 🐛 Debugging Tests

### Common Issues

1. **Async Operations**: Use `waitFor` for async state changes
2. **Mock Cleanup**: Ensure mocks are cleared between tests
3. **DOM Cleanup**: Use proper cleanup in component tests
4. **State Isolation**: Reset global state between tests

### Debugging Tools

```bash
# Run specific test file
npm test -- --testNamePattern="AuthGuard"

# Run tests with verbose output
npm test -- --verbose

# Debug mode (Node.js debugging)
node --inspect-brk node_modules/.bin/jest --runInBand
```

## 🔄 Continuous Integration

Tests are integrated into the CI/CD pipeline:

1. **Pre-commit**: Fast test suite runs on commit
2. **Pull Requests**: Full test suite with coverage reports
3. **Deployment**: Tests must pass before deployment

## 📈 Future Improvements

### Planned Enhancements

1. **Visual Regression Tests**: Screenshot comparison testing
2. **Performance Tests**: Load and performance testing
3. **Accessibility Tests**: Automated a11y testing
4. **API Tests**: Backend API testing
5. **Cross-browser Tests**: Multi-browser compatibility

### Test Metrics

- **Coverage Target**: 80%+ for critical paths
- **Performance**: Tests should complete in < 30 seconds
- **Reliability**: < 1% flaky test rate

## 🤝 Contributing

When adding new features:

1. **Write Tests First**: TDD approach when possible
2. **Update Documentation**: Keep this guide current
3. **Follow Patterns**: Use existing test patterns
4. **Review Coverage**: Ensure adequate test coverage

### Test Checklist

- [ ] Unit tests for new components/hooks
- [ ] BDD scenarios for new user features
- [ ] Mock external dependencies
- [ ] Test error scenarios
- [ ] Update test documentation
- [ ] Verify CI/CD integration

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

For questions or issues with testing, please refer to this documentation or reach out to the development team.
