# Comprehensive Playwright Cross-Site Test Automation Framework

## Project Overview

This advanced test automation framework leverages Playwright and TypeScript to rigorously test multiple websites including SauceDemo (e-commerce), The Internet Herokuapp, and DemoQA. The framework implements a robust Page Object Model (POM) design pattern for maximum maintainability, reusability, and scalability across different applications, browsers, and devices.

## Key Features

- **Multi-browser testing engine** with Chrome, Firefox, Safari, and Edge support
- **Device-agnostic testing** across desktop, tablet, and mobile viewports
- **Cross-site architecture** enabling consistent testing methodologies across diverse applications
- **Sophisticated test categorization** with smoke, regression, and custom tags
- **Comprehensive reporting** with screenshots, videos, and execution traces
- **Flexible execution modes** via command-line, batch file, or UI interface
- **Parallel test execution** for optimized performance
- **Intelligent retries** for flaky tests to improve reliability
- **Automatic artifact collection** for debugging failed tests

## Target Websites & Testing Coverage

### 1. SauceDemo (E-commerce Platform)

- **Authentication & Security**
  - Standard user authentication flows
  - Locked out user handling and error messaging
  - Invalid credentials validation
  - Session persistence verification
  - Form field validations with various inputs
- **Product Catalog Management**
  - Dynamic product listing display and verification
  - Multi-criteria sorting (alphabetical A-Z, Z-A, price low-high, high-low)
  - Product filtering and search functionality
  - Detailed product view with specifications
  - Image loading verification
- **Shopping Cart Operations**
  - Add to cart functionality with quantity validation
  - Remove from cart with state verification
  - Cart badge dynamic updates
  - Cart persistence across page navigation
- **Checkout Process**
  - Multi-step checkout flow navigation
  - Customer information form with validation
  - Shipping details entry and verification
  - Order summary accuracy verification
  - Tax and total calculations
  - Order confirmation and receipt validation

### 2. The Internet Herokuapp (Testing Playground)

- **File System Operations**
  - File upload with various file types and sizes
  - File download handling and verification
  - Upload restrictions testing
- **Advanced User Interactions**
  - Drag and drop functionality with dynamic content
  - Hover actions with dropdown menus
  - Context menu operations
  - Keyboard shortcuts and navigation
- **Popup & Dialog Management**
  - Standard alert handling and verification
  - Confirmation dialogs with accept/reject paths
  - Prompt dialogs with dynamic input
  - Custom modal windows
- **Dynamic Content Handling**
  - Lazy-loaded elements
  - Disappearing/appearing elements
  - Content that changes on refresh

### 3. DemoQA (UI Component Library)

- **Complex UI Interactions**
  - Advanced button interactions (double-click, right-click, standard click)
  - Dynamic web tables with pagination, sorting, and filtering
  - CRUD operations on tabular data
  - Form elements with complex validation rules
- **Widget Testing**
  - Date pickers and time selectors
  - Progress bars and sliders
  - Tooltips and accordions
  - Tabs and menu navigation

## Comprehensive Test Organization

### Functional Classification

- **Authentication & Security Tests**: User access controls and authentication flows
- **UI Component Tests**: Verification of common and specialized UI elements
- **Business Process Tests**: End-to-end workflows simulating real user journeys
- **API Integration Tests**: Backend service integration points
- **Cross-Browser Compatibility Tests**: Behavior consistency across browsers
- **Responsive Design Tests**: Adaptation across device viewports

### Test Categorization

- **@smoke**: Critical path tests (5-10 minutes runtime) for quick validation
- **@regression**: Comprehensive test suite for thorough verification
- **@critical**: Business-critical functionality tests
- **@flaky**: Tests identified as occasionally unstable for special handling
- **Website-specific tags**: @internet, @saucedemo, @demoqa for targeted execution

## Web UI Elements Covered

- **Text Input Controls**: Login credentials, search bars, form fields, text areas
- **Button Varieties**: Standard clicks, double-clicks, right-clicks, disabled states
- **Selection Controls**: Dropdowns, multi-selects, autocomplete fields
- **Toggle Elements**: Checkboxes, radio buttons, switches, toggles
- **Navigation Components**: Menus, breadcrumbs, pagination, tabs
- **Data Display Elements**: Tables, grids, lists with sorting/filtering
- **Notification Components**: Alerts, modals, toasts, confirmation dialogs
- **File Manipulation Elements**: Upload/download functionality
- **Dynamic Interactive Elements**: Drag-drop interfaces, resizable panels
- **Temporal Components**: Date pickers, time selectors, progress indicators

## Framework Architecture & Design

### Core Directory Structure

- **pages/**: Page Object Models
  - **base-page.ts**: Foundation class with common utilities and error handling
  - **sauce-demo/**: E-commerce site page objects
  - **the-internet/**: Herokuapp page objects
  - **demoqa/**: DemoQA site page objects
  - **components/**: Reusable UI component abstractions
- **tests/**: Test implementations
  - **authentication/**: User access scenarios
  - **cart/**: Shopping cart manipulation tests
  - **checkout/**: Order processing workflows
  - **cross-browser/**: Browser-specific compatibility tests
  - **cross-site/**: Multi-site element verification
  - **elements/**: UI component verification
  - **file-operations/**: File handling test cases
  - **forms/**: Form interaction and validation
  - **product/**: Product catalog navigation and interaction
- **utilities/**: Helper functions and test utilities
  - **data-generators/**: Test data creation utilities
  - **assertions/**: Custom assertion extensions
  - **test-helpers/**: Common test operations

### Design Patterns Implemented

- **Page Object Model (POM)**: Separation of test logic from page interactions
- **Fluent Interface Pattern**: Method chaining for readable test flows
- **Factory Pattern**: For creating test data and page objects
- **Singleton Pattern**: For browser instance management
- **Builder Pattern**: For complex test data construction
- **Command Pattern**: For encapsulating operations

## Execution Options & Configuration

### Running Tests

Tests can be executed through multiple interfaces:

1. **Command line**: Direct control with filtering options
2. **UI Mode**: Visual test explorer and execution
3. **Batch file**: Menu-driven selection for non-technical users
4. **CI/CD Integration**: Jenkins, GitHub Actions, or Azure DevOps

### Key Command Examples

- Run all tests: `npx playwright test`
- Run visual browser tests: `npx playwright test --headed`
- Target specific browser: `npx playwright test --project=chromium`
- Execute by tag: `npx playwright test --grep @smoke`
- Debug mode: `npx playwright test --debug`
- Run specific file: `npx playwright test tests/authentication/login.spec.ts`
- Generate report: `npx playwright show-report`

### Configuration Options

The framework provides extensive configuration through `playwright.config.ts`:

- Browser profiles with customized settings
- Viewport definitions for responsive testing
- Timeout adjustments for varying test complexity
- Reporter configuration for result analysis
- Parallel execution settings for performance
- Retry logic for handling flaky tests
- Screenshot and video capture rules

## Advanced Features

### Data-Driven Testing

- External data sources for test parameters
- Parameterized tests for efficiency
- Dynamic test generation based on data

### Visual Testing Capabilities

- Element screenshot comparison
- Layout verification across viewports
- Visual regression detection

### Performance Metrics

- Page load time measurement
- Resource loading analysis
- Time-to-interactive tracking

### Accessibility Testing

- WCAG compliance verification
- Screen reader compatibility
- Keyboard navigation testing

## Best Practices Implemented

- **Isolation**: Tests are independent and avoid cross-contamination
- **Readability**: Clear naming and structure for maintainability
- **Reusability**: Common components and utilities to minimize duplication
- **Reliability**: Robust waiting and synchronization mechanisms
- **Documentation**: Comprehensive comments and documentation
- **Error Handling**: Graceful failure modes with diagnostic information
- **Clean Code**: Consistent formatting and style guidelines

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Browsers for testing (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository
2. Run `npm install`
3. Install browser drivers: `npx playwright install`

### First Test Run

Execute the batch file or run `npx playwright test --project=chromium --headed` to see tests in action.

### Extending the Framework

- Add new page objects in the appropriate site directory
- Create new test files in the relevant test category
- Update the configuration for any special requirements

## Playwright CLI Tools

This project uses the `playwright-cli-select` tool to enhance the testing workflow with Playwright. This section documents how to use the CLI tools effectively.

## Installation

The `playwright-cli-select` tool should be installed as a dev dependency in your project:

```bash
npm install playwright-cli-select --save-dev
```

## Usage

### Running Tests with Selection UI

To run tests with an interactive selection UI:

```bash
npx playwright-cli-select run
```

This command allows you to:

- Select specific test files to run
- Choose test cases by their tags (e.g., @smoke, @regression)
- Configure browser and other runtime options

### Common Commands

#### Run all tests

```bash
npx playwright-cli-select run
```

#### Run tests with specific tags

```bash
npx playwright-cli-select run --tag smoke
```

#### Run tests in a specific browser

```bash
npx playwright-cli-select run --browser chromium
```

#### Run tests in headed mode (visible browser)

```bash
npx playwright-cli-select run --headed
```

#### Generate test reports

```bash
npx playwright-cli-select run --reporter=html
```

## Configuration

The tool uses your existing Playwright configuration (`playwright.config.ts`) for most settings. Additional CLI options will override those settings when specified.

## Troubleshooting

### JSON Parsing Errors

If you encounter JSON parsing errors like:

```
SyntaxError: Unexpected token 'S', "Successful"... is not valid JSON
```

This may be caused by:

1. Console.log statements interfering with the CLI parser
2. Invalid JSON format in your test data files
3. Stdout/stderr capture conflicts

**Solutions:**

- Remove or modify console.log statements in test initialization code
- Ensure test data files are properly formatted JSON
- Use console.error instead of console.log for messages during setup

### Other Common Issues

- **Command not found**: Ensure the package is installed and the path is correct
- **Tests not appearing in selection**: Check that your test files follow the naming pattern recognized by Playwright
- **Browser launch failures**: Verify browser installations with `npx playwright install`

## Advanced Usage

### Custom Test Selection Criteria

You can create custom selectors by combining tags, file patterns, and test names:

```bash
npx playwright-cli-select run --tag smoke --testNamePattern="login|checkout"
```

### Integration with CI/CD

For CI/CD environments, you can bypass the interactive selection:

```bash
npx playwright-cli-select run --tag regression --ci
```

## Recommended Practices

1. **Tag your tests** with descriptive markers (@smoke, @regression, @e2e)
2. **Avoid console.log** in code that executes during test discovery
3. **Use proper JSON** for all data files
4. **Handle errors gracefully** when loading test data

## GitHub Actions Integration

This project uses GitHub Actions for continuous integration testing. The workflow automatically runs tests on code changes and pull requests.

### Workflow Configuration

The GitHub Actions workflow is defined in `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  test:
    name: Run Playwright tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Install Microsoft Edge
        run: npx playwright install msedge

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Features

- **Automatic Trigger**: Tests run automatically on pushes and pull requests to main/master branches
- **Browser Installation**: Installs all required browsers including Microsoft Edge
- **Dependency Caching**: Caches npm dependencies for faster workflow execution
- **HTML Reports**: Generates and uploads HTML reports as artifacts
- **Failure Handling**: Uploads test reports even when tests fail

### Viewing Test Results

1. Go to the "Actions" tab in your GitHub repository
2. Click on the latest workflow run
3. Scroll down to the "Artifacts" section
4. Download the "playwright-report" artifact to view the HTML test report

### Customizing the Workflow

To modify the GitHub Actions workflow:

1. Edit the `.github/workflows/playwright.yml` file
2. Commit and push your changes
3. GitHub will use the updated workflow for future runs

You can customize:

- The trigger events (which branches, events, etc.)
- Test execution strategy (browsers, parallelism)
- Environment variables and secrets
- Notification settings

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [playwright-cli-select on npm](https://www.npmjs.com/package/playwright-cli-select)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright GitHub Actions](https://playwright.dev/docs/ci-intro)
