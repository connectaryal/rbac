# Contributing to @connectaryal/rbac

First off, thank you for considering contributing to @connectaryal/rbac! 🎉

It's people like you that make this project a great tool for the React community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#-reporting-bugs)
  - [Suggesting Features](#-suggesting-features)
  - [Improving Documentation](#-improving-documentation)
  - [Code Contributions](#-code-contributions)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing Guidelines](#testing-guidelines)
- [Recognition](#recognition)

---

## Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you're expected to uphold this code. Please report unacceptable behavior to aryalshiva005@gmail.com.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/connectaryal/rbac/issues) to avoid duplicates.

**When creating a bug report, please include:**

- **Clear, descriptive title** - Summarize the issue in one line
- **Steps to reproduce** - Detailed steps to trigger the bug
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Environment details**:
  - `@connectaryal/rbac` version
  - React version
  - Node.js version
  - Browser (if applicable)
  - Operating System
- **Code example** - Minimal reproduction (CodeSandbox/StackBlitz link preferred)
- **Screenshots** - If applicable
- **Error messages** - Full stack traces

**Example Bug Report:**

```markdown
**Title:** usePermission returns null instead of false when RBAC not initialized

**Steps to Reproduce:**
1. Create component using usePermission hook
2. Don't wrap with RBACProvider
3. Component renders with hasPermission = null

**Expected:** Should return false or throw helpful error
**Actual:** Returns null silently

**Environment:**
- @connectaryal/rbac: 1.0.0
- React: 18.2.0
- Node: 20.10.0

**CodeSandbox:** https://codesandbox.io/s/...
```

### 💡 Suggesting Features

We love feature ideas! Feature requests help us understand what the community needs.

**Before suggesting a feature:**

- Check if it already exists in the [roadmap](https://github.com/connectaryal/rbac/discussions)
- Search [existing feature requests](https://github.com/connectaryal/rbac/issues?q=label%3Aenhancement)
- Consider if it fits the project scope (simple RBAC for React)

**When suggesting a feature, please include:**

- **Problem statement** - What problem does this solve?
- **Proposed solution** - How should it work?
- **Use case** - Real-world example of when you'd use it
- **Alternatives considered** - Other ways to solve the problem
- **Example usage** - Mock code showing how it would be used
- **Breaking changes** - Would this break existing code?

**Example Feature Request:**

```markdown
**Title:** Add useRoleCheck hook for checking user roles

**Problem:** Currently checking roles requires accessing rbac directly via useRBACContext

**Proposed Solution:**
Add a dedicated `useRoleCheck()` hook:

```tsx
const isAdmin = useRoleCheck('admin');
const hasAnyRole = useRoleCheck(['admin', 'editor'], 'SOME');
```

**Use Case:** 
In admin panels where role checks are more common than permission checks

**Example Usage:**
```tsx
function AdminSettings() {
  const isAdmin = useRoleCheck('admin');
  if (!isAdmin) return <AccessDenied />;
  return <Settings />;
}
```

**Alternatives:**
- Use `useRBACContext()` and check manually (current approach)
- Use permission-based checks instead of role checks
```

### 📝 Improving Documentation

Documentation improvements are always welcome! This includes:

- **Fixing typos or grammar**
- **Improving clarity** - Explain things better
- **Adding examples** - Show more use cases
- **Adding diagrams** - Visual explanations
- **Improving TypeScript docs** - Better type documentation
- **Translating** - Help make docs accessible to more people

**Documentation areas:**
- README.md
- REACT_GUIDE.md
- FEATURES.md
- ROLES_GUIDE.md
- RESTRICTIONS_GUIDE.md
- Code comments and JSDoc
- Example files

### 💻 Code Contributions

We welcome code contributions! Here's how to get started:

---

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm, yarn, or pnpm
- Git
- Code editor (VS Code recommended)

### Getting Started

1. **Fork the repository**
   
   Click the "Fork" button on GitHub

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/rbac.git
   cd rbac
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/connectaryal/rbac.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

5. **Create a branch**

   ```bash
   git checkout -b feature/my-feature-name
   # or
   git checkout -b fix/bug-description
   ```

### Development Commands

```bash
# Type checking
npm run typecheck

# Build the project
npm run build

# Run tests (when available)
npm test

# Run tests in watch mode
npm test -- --watch

# Format code (when configured)
npm run format

# Lint code (when configured)
npm run lint
```

### Making Changes

1. **Make your changes** in your feature branch
2. **Test thoroughly** - Ensure nothing breaks
3. **Add tests** for new features
4. **Update documentation** if needed
5. **Run type checking** - `npm run typecheck`
6. **Build successfully** - `npm run build`
7. **Commit your changes** using [conventional commits](#commit-messages)

---

## Project Structure

Understanding the project structure helps you navigate the codebase:

```
react-rbac/
├── src/
│   ├── core/
│   │   └── rbac.ts              # Core RBAC logic (no React)
│   ├── react/
│   │   ├── RBACProvider.tsx     # React Context Provider
│   │   ├── usePermission.tsx    # Permission hooks
│   │   ├── components.tsx       # React components
│   │   └── index.ts             # React exports
│   ├── types/
│   │   └── permission.types.ts  # TypeScript types
│   ├── constants/               # Constants and enums
│   ├── utils/                   # Utility functions
│   └── index.ts                 # Main entry point
├── examples/
│   ├── react-usage.tsx          # React examples
│   └── basic-usage.ts           # Core usage examples
├── dist/                        # Built files (generated)
├── docs/                        # Documentation
│   ├── REACT_GUIDE.md
│   ├── FEATURES.md
│   └── ...
├── .github/
│   └── ISSUE_TEMPLATE/          # Issue templates
├── package.json
├── tsconfig.json
├── README.md
└── CONTRIBUTING.md              # This file
```

### Key Files to Know

- **`src/core/rbac.ts`** - Core permission logic (framework-agnostic)
- **`src/react/usePermission.tsx`** - Main React hooks
- **`src/react/components.tsx`** - All React components
- **`src/types/permission.types.ts`** - TypeScript definitions
- **`src/index.ts`** - Public API exports

---

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear, structured commit messages.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **test**: Adding or updating tests
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **style**: Code style changes (formatting, no logic change)
- **chore**: Maintenance tasks (dependencies, build, etc.)
- **ci**: CI/CD changes
- **revert**: Revert a previous commit

### Scopes (optional)

- `core` - Core RBAC logic
- `hooks` - React hooks
- `components` - React components
- `types` - TypeScript types
- `docs` - Documentation
- `examples` - Example code

### Examples

```bash
# Feature
feat(hooks): add useRoleCheck hook for role validation

# Bug fix
fix(core): resolve sector restriction not applying correctly

# Documentation
docs(readme): add comparison with CASL

# Multiple scopes
feat(hooks,components): add loading state support

# Breaking change
feat(core)!: change permission check API

BREAKING CHANGE: `can()` now returns boolean instead of object
```

### Writing Good Commit Messages

✅ **DO:**
- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep subject line under 72 characters
- Reference issues/PRs when relevant (`fixes #123`)

❌ **DON'T:**
- Don't capitalize first letter of subject
- Don't end subject with period
- Don't be vague ("fix stuff", "update code")

---

## Pull Request Process

### Before Submitting

- [ ] Code follows project style
- [ ] All tests pass
- [ ] Type checking passes
- [ ] Documentation is updated
- [ ] Examples are updated (if needed)
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with main

### Creating a Pull Request

1. **Push your branch** to your fork

   ```bash
   git push origin feature/my-feature
   ```

2. **Create PR** on GitHub
   - Use a clear, descriptive title
   - Fill out the PR template
   - Link related issues (`Fixes #123`, `Closes #456`)
   - Add screenshots for UI changes
   - Mark as draft if work in progress

3. **PR Title Format**

   Same as commit messages:
   ```
   feat(hooks): add useRoleCheck hook
   fix(components): resolve Can component not re-rendering
   docs: improve getting started guide
   ```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Changes Made
- List key changes
- Be specific about what changed

## Related Issues
Fixes #123
Related to #456

## Testing
How did you test this?

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
- [ ] All tests pass
- [ ] Works in all supported React versions
```

### Review Process

1. **Automated checks** run (CI/CD)
2. **Maintainer review** (usually within 48 hours)
3. **Feedback** addressed
4. **Approval** and merge
5. **Recognition** in release notes

### After Your PR is Merged

1. **Delete your branch** (keep repo clean)
2. **Update your fork**
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```
3. **Celebrate!** 🎉 You're now a contributor!

---

## Code Style

### General Guidelines

- **Write clear, readable code** - Code is read more than written
- **Keep functions small** - Single responsibility principle
- **Use descriptive names** - Variable and function names should be self-documenting
- **Comment "why" not "what"** - Code shows what, comments explain why
- **Avoid premature optimization** - Make it work, then make it fast

### TypeScript

```typescript
// ✅ DO: Use explicit types
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ DON'T: Use 'any'
function calculateTotal(items: any): any {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ DO: Use interfaces for objects
interface User {
  id: string;
  name: string;
  roles: Role[];
}

// ✅ DO: Document complex types
/**
 * Configuration for RBAC system
 * @template TRoleName - Type for role names
 * @template TPerm - Type for permissions
 */
export interface TConfig<TRoleName, TPerm> {
  // ...
}
```

### React

```tsx
// ✅ DO: Use function components
function MyComponent({ permission }: Props) {
  return <div>{permission}</div>;
}

// ✅ DO: Destructure props
function MyComponent({ permission, onCheck }: Props) {
  // ...
}

// ❌ DON'T: Use props directly
function MyComponent(props) {
  return <div>{props.permission}</div>;
}

// ✅ DO: Use hooks at top level
function MyComponent() {
  const [state, setState] = useState();
  const permission = usePermission('read');
  // ...
}

// ✅ DO: Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

### Naming Conventions

```typescript
// Components: PascalCase
export function PermissionGate() {}

// Hooks: camelCase with 'use' prefix
export function usePermission() {}

// Types/Interfaces: PascalCase with 'T' prefix (for type params)
export interface TConfig<TRoleName, TPerm> {}

// Constants: UPPER_SNAKE_CASE
export const DEFAULT_CHECK_TYPE = 'SOME';

// Private methods: camelCase with _ prefix
private _isRestricted() {}

// Boolean variables: is/has/can prefix
const isRestricted = true;
const hasPermission = false;
const canEdit = true;
```

---

## Testing Guidelines

### Writing Tests

```typescript
// ✅ DO: Write descriptive test names
it('should return true when user has permission', () => {
  // ...
});

it('should return false when permission is restricted', () => {
  // ...
});

// ✅ DO: Test behavior, not implementation
it('should render children when permission is granted', () => {
  const { getByText } = render(
    <Can permissions="edit">
      <button>Edit</button>
    </Can>
  );
  expect(getByText('Edit')).toBeInTheDocument();
});

// ❌ DON'T: Test implementation details
it('should call hasPermission method', () => {
  // Testing internal implementation
});
```

### Test Structure

```typescript
describe('usePermission', () => {
  describe('when user has permission', () => {
    it('should return hasPermission as true', () => {
      // Test
    });

    it('should not mark permission as restricted', () => {
      // Test
    });
  });

  describe('when permission is restricted', () => {
    it('should return hasPermission as false', () => {
      // Test
    });

    it('should mark permission as restricted', () => {
      // Test
    });
  });
});
```

### Coverage Goals

- Aim for **80%+ test coverage**
- **100% coverage** for core logic (`rbac.ts`)
- Test **edge cases** and **error conditions**
- Test **React component rendering**
- Test **hook state changes**

---

## Recognition

All contributors will be recognized for their efforts:

### You'll be:
- ✅ Added to the **Contributors** list on GitHub
- ✅ Mentioned in **release notes**
- ✅ Featured on the **project website** (for significant contributions)
- ✅ Given a **shoutout on Twitter**
- ✅ Awarded **contributor badge** (if GitHub achievements enabled)

### Significant Contributors
Contributors with multiple PRs or major features may be:
- Invited to be a **maintainer**
- Featured in **blog posts**
- Given **early access** to new features
- Offered **swag** (when available)

---

## Questions?

Have questions about contributing? We're here to help!

- 💬 **[GitHub Discussions](https://github.com/connectaryal/rbac/discussions)** - Ask anything
- 🐦 **[Twitter](https://twitter.com/connectaryal)** - Quick questions
- 📧 **Email** - aryalshiva005@gmail.com (for private matters)
- 💬 **Discord** - [Join our community](https://discord.gg/yourlink) (coming soon)

---

## Code of Conduct Reminder

Please be respectful, constructive, and helpful. We're all here to build something great together.

Read our full [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Thank You! 🙏

Every contribution, no matter how small, makes a difference. Thank you for taking the time to improve @connectaryal/rbac!

Your contributions help React developers around the world build better applications with simpler authorization.

---

**Happy Contributing!** 🚀

<p align="center">
  Made with ❤️ by the @connectaryal/rbac community
</p>