# Contributing to Smart Construction Assistant

First off, thank you for considering contributing to Smart Construction Assistant! It's people like you that make this tool better for the construction community.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- npm or yarn
- Git
- A GitHub account
- Basic knowledge of React and JavaScript

### Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/SmartAssistant2.git
   cd SmartAssistant2
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/al7566/SmartAssistant2.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start development server**:
   ```bash
   npm start
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

**Bug Report Template:**

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 96, Safari 15]
- Node Version: [e.g., 18.18.0]
- App Version: [e.g., 1.0.0]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - Why is this needed?
- **Proposed solution**
- **Alternatives considered**
- **Additional context** or screenshots

**Enhancement Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've considered.

**Additional context**
Any other context, screenshots, or examples.
```

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `documentation` - Documentation improvements

### Pull Requests

1. **Small, focused changes** are easier to review
2. **One feature/fix per PR**
3. **Update documentation** if needed
4. **Add tests** if applicable
5. **Follow style guidelines**

## Development Workflow

### Branch Naming

Use descriptive branch names:
- `feature/calculator-improvements`
- `fix/chat-input-bug`
- `docs/deployment-guide`
- `refactor/component-structure`

### Making Changes

1. **Keep changes focused** - One feature or fix per PR
2. **Write clear code** - Use meaningful variable names
3. **Comment complex logic** - Help others understand
4. **Test thoroughly** - Verify all scenarios work
5. **Update docs** - Keep README current

### Testing Your Changes

```bash
# Run the development server
npm start

# Build for production
npm run build

# Run tests (when available)
npm test

# Lint your code
npm run lint
```

**Manual testing checklist:**
- [ ] App loads without errors
- [ ] All tabs are accessible
- [ ] Calculators produce correct results
- [ ] Chat input and responses work
- [ ] Mobile responsiveness works
- [ ] No console errors
- [ ] Build completes successfully

## Style Guidelines

### JavaScript/React Style

- Use **functional components** with hooks
- Use **meaningful variable names**
- Keep **components focused** (single responsibility)
- Use **destructuring** where appropriate
- Prefer **const** over let, avoid var
- Use **async/await** over promises
- Follow **DRY principle** (Don't Repeat Yourself)

**Example:**

```jsx
// Good
const [isOpen, setIsOpen] = useState(false);
const handleToggle = () => setIsOpen(!isOpen);

// Avoid
var x = false;
function toggle() {
  x = !x;
}
```

### CSS/Tailwind Style

- Use **Tailwind utility classes**
- Keep **custom CSS minimal**
- Use **responsive modifiers** (sm:, md:, lg:)
- Group **related classes** together
- Use **component-specific classes** sparingly

**Example:**

```jsx
// Good
<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Click Me
</button>

// Avoid inline styles
<button style={{ padding: "8px 16px", background: "#2563eb" }}>
  Click Me
</button>
```

### File Organization

```
src/
├── components/          # Reusable components (future)
├── utils/              # Helper functions (future)
├── App.jsx             # Main component
├── index.js            # Entry point
└── index.css           # Global styles
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(calculator): add roofing calculator

Add new calculator for roof material estimation including
shingles, underlayment, and ridge caps.

Closes #123
```

```bash
fix(chat): resolve input clear issue

Fix bug where chat input wasn't clearing after sending
message on mobile devices.

Fixes #456
```

```bash
docs(readme): update deployment instructions

Add more detailed steps for Netlify deployment and
troubleshooting common issues.
```

### Commit Best Practices

- **Present tense**: "Add feature" not "Added feature"
- **Imperative mood**: "Move cursor to" not "Moves cursor to"
- **Capitalize first letter**
- **No period at the end**
- **Keep first line under 72 characters**
- **Reference issues**: Use "Fixes #123" or "Closes #456"

## Pull Request Process

### Before Submitting

1. **Update your branch** with latest upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test thoroughly**:
   ```bash
   npm start
   npm run build
   ```

3. **Check for console errors**

4. **Update documentation** if needed

5. **Run linter** (if available):
   ```bash
   npm run lint
   ```

### Submitting PR

1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub

3. **Fill out PR template**:
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Tested locally
   - [ ] Build succeeds
   - [ ] No console errors

   ## Screenshots (if applicable)
   Add screenshots to help explain your changes

   ## Related Issues
   Closes #123
   ```

4. **Link related issues**

5. **Request review**

### PR Review Process

1. **Reviewers will check**:
   - Code quality and style
   - Functionality works as intended
   - Tests pass (when available)
   - Documentation is updated
   - No breaking changes

2. **Address feedback**:
   - Make requested changes
   - Push to same branch
   - Reply to comments

3. **Once approved**:
   - PR will be merged by maintainer
   - Branch can be deleted

### After Merge

1. **Delete your branch**:
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. **Update your fork**:
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

## Additional Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Future CONTRIBUTORS.md file
- Release notes (for significant contributions)

## Questions?

- **Open an issue** for questions about contributing
- **Join discussions** on GitHub Discussions
- **Check existing issues** and PRs first

---

Thank you for contributing to Smart Construction Assistant! 🏗️

Together, we're building better tools for the construction community.
