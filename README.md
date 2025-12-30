# Smart Construction Assistant 🏗️

A comprehensive, production-ready React application for construction planning, material calculations, cost estimation, and project management. Built with React, Tailwind CSS, and designed for easy deployment on modern hosting platforms.

![Construction Assistant](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🤖 AI-Powered Q&A Chat
- Interactive construction chatbot
- Instant answers about materials, costs, permits, and safety
- Context-aware responses for common construction queries
- **Future**: Claude API integration for advanced AI capabilities

### 🧮 Material Calculators
- **Concrete Calculator**: Volume, cubic yards, bag count, cost estimates
- **Lumber Calculator**: Board feet, linear footage calculations
- **Drywall Calculator**: Sheet count and area coverage
- **Flooring Calculator**: Square footage with waste factor

### 📋 Project Planner
- Create and track multiple projects
- Budget tracking and timeline management
- Project status monitoring
- Detailed project descriptions

### ⚠️ Safety & Permits
- Comprehensive PPE guidelines
- Site safety checklists
- Permit requirement information
- Building code references

### 💰 Cost Estimator
- Average cost breakdowns by category
- Per-square-foot pricing for common projects
- Cost-saving tips and strategies
- Budget allocation guidance

## 🚀 Quick Start

### Prerequisites
- Node.js 18.18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/al7566/SmartAssistant2.git
   cd SmartAssistant2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

## 📦 Deployment

### Option 1: Vercel (Recommended - Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/al7566/SmartAssistant2)

**Manual Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Option 2: Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/al7566/SmartAssistant2)

**Manual Deployment:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=build
```

### Option 3: Render

1. Connect your GitHub repository to Render
2. Render will automatically detect the `render.yaml` configuration
3. Click "Create Web Service"

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete platform-specific guides.

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.0
- **Icons**: Lucide React 0.294.0
- **Build Tool**: React Scripts 5.0.1
- **Deployment**: Vercel / Netlify / Render ready

## 📁 Project Structure

```
SmartAssistant2/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.jsx             # Main application component
│   ├── index.js            # React entry point
│   └── index.css           # Tailwind CSS imports
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── .nvmrc                  # Node version specification
├── jsconfig.json           # JavaScript configuration
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vercel.json             # Vercel deployment config
├── netlify.toml            # Netlify deployment config
├── render.yaml             # Render deployment config
├── DEPLOYMENT.md           # Deployment guide
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                 # MIT License
└── README.md               # This file
```

## 🔮 Future Enhancements

### Premium Features (Monetization Roadmap)

1. **Claude AI Integration** ($9.99/month)
   - Advanced natural language understanding
   - Personalized project recommendations
   - Complex construction scenario analysis
   - Real-time code compliance checking

2. **PDF Report Generation** ($4.99/report or included in premium)
   - Professional project estimates
   - Material lists with sourcing
   - Timeline Gantt charts
   - Budget breakdown reports

3. **Advanced Material Cost Database** (Premium tier)
   - Real-time pricing from suppliers
   - Location-based cost adjustments
   - Seasonal price predictions
   - Bulk discount calculations

4. **Multi-Project Management** (Premium tier)
   - Unlimited projects (vs 3 free)
   - Portfolio dashboard
   - Resource allocation across projects
   - Comparative analytics

5. **Team Collaboration** ($19.99/month for teams)
   - Multi-user access
   - Role-based permissions
   - Shared project workspaces
   - Comment and annotation tools
   - Activity tracking

### Free vs Premium Comparison

| Feature | Free | Premium |
|---------|------|---------|
| Basic Calculators | ✅ | ✅ |
| Q&A Chatbot | ✅ Basic | ✅ Claude AI |
| Projects | 3 max | Unlimited |
| PDF Reports | ❌ | ✅ |
| Cost Database | Basic | Real-time |
| Team Collaboration | ❌ | ✅ |

## 🔒 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Future: Claude API Integration
REACT_APP_CLAUDE_API_KEY=your_api_key_here

# App Configuration
REACT_APP_NAME="Construction Assistant"
REACT_APP_VERSION=1.0.0
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- Code of Conduct
- Development workflow
- Pull request process
- Coding standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Issues**: [GitHub Issues](https://github.com/al7566/SmartAssistant2/issues)
- **Discussions**: [GitHub Discussions](https://github.com/al7566/SmartAssistant2/discussions)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)
- Built with [Create React App](https://create-react-app.dev/)

## ⚠️ Disclaimer

This tool provides estimates and guidance for construction planning. Always consult with licensed professionals, engineers, and contractors for your specific projects. Verify all calculations and comply with local building codes and regulations.

---

**Built with ❤️ for the construction community**
