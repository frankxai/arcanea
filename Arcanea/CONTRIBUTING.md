# Contributing to Arcanea

First off, thank you for considering contributing to Arcanea! We're excited to have you on board. Here are some guidelines to help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Code Style](#-code-style)
- [Commit Message Guidelines](#-commit-message-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Reporting Issues](#-reporting-issues)
- [Feature Requests](#-feature-requests)
- [License](#-license)

## Code of Conduct

By participating in this project, you're expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior to our team.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/arcanea.git
   cd arcanea
   ```
3. **Set up the development environment** (see [README.md](README.md) for detailed instructions)
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🔧 Development Workflow

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start the development server**:
   ```bash
   # For web development
   pnpm --filter web-portal dev
   
   # For mobile development
   pnpm --filter mobile-app start
   ```

3. **Run tests**:
   ```bash
   pnpm test
   ```

4. **Lint your code**:
   ```bash
   pnpm lint
   ```

5. **Build the project**:
   ```bash
   pnpm build
   ```

## 🎨 Code Style

- We use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to maintain consistent code style
- Run `pnpm format` to automatically format your code
- All TypeScript code must pass type checking (`pnpm type-check`)
- Write meaningful commit messages (see below)
- Keep PRs focused and limited to a single feature/fix

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Example**:
```
feat(auth): add Google OAuth authentication

- Add Google OAuth2 authentication flow
- Update user model to store OAuth tokens
- Add login/logout UI components

Closes #123
```

## 🔄 Pull Request Process

1. Fork the repository and create your branch from `main`
2. Make your changes following the code style guidelines
3. Add or update tests as needed
4. Update the documentation if necessary
5. Ensure the test suite passes
6. Make sure your code lints
7. Submit the PR with a clear description of changes

## 🐛 Reporting Issues

When reporting issues, please include:

1. A clear, descriptive title
2. Steps to reproduce the issue
3. Expected vs. actual behavior
4. Screenshots or screen recordings if applicable
5. Browser/device information if relevant

## 💡 Feature Requests

We welcome feature requests! Please open an issue with:

1. A clear description of the feature
2. The problem it solves
3. Any alternative solutions you've considered
4. Additional context or screenshots

## 📄 License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to Arcanea! Your help is greatly appreciated. 💜
