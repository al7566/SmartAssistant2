# Smart Assistant 2 🤖

A comprehensive AI-powered Smart Assistant with secure key management, voice interaction, calendar integration, cybersecurity monitoring, and blueprint analysis capabilities.

## Features

### 🧠 Core Smart Assistant Capabilities

- **AI-Powered Conversations** - Natural language processing with GPT-4, Claude, and Gemini
- **Voice Interaction** - Text-to-speech, speech-to-text, phone calls, and SMS
- **Calendar & Scheduling** - Google Calendar and Microsoft Outlook integration
- **Task Management** - Intelligent schedule organization
- **Cybersecurity Protection** - Real-time threat monitoring and file scanning
- **Blueprint Creation & Analysis** - CAD drawing capabilities and technical diagram generation
- **Universal Knowledge Base** - AI-powered search and information retrieval

### 🔐 Security & Configuration

- **Secure Key Management** - Environment-based configuration with validation
- **Setup Wizard** - Interactive key validation with color-coded status
- **Encrypted Storage** - Safe handling of sensitive credentials
- **Git-Safe** - Automatic prevention of secret commits

## Quick Start

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/al7566/SmartAssistant2.git
cd SmartAssistant2

# Install dependencies
npm install
```

### 2. Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit .env and add your API keys
nano .env  # or use your preferred editor
```

### 3. Setup Wizard

Run the interactive setup wizard to validate your configuration:

```bash
npm run check-keys
```

The wizard will:
- ✅ Check which API keys are configured
- ✅ Validate key formats
- ✅ Test connections to services
- ✅ Show which features are available

### 4. Start the Assistant

```bash
npm start
```

## Project Structure

```
SmartAssistant2/
├── .env.example              # Template for environment variables
├── .env                       # Your actual keys (git-ignored)
├── .gitignore                # Prevents committing secrets
├── package.json              # Dependencies and scripts
├── README.md                 # This file
├── SETUP_GUIDE.md           # Detailed API key setup instructions
├── config/
│   ├── keys.js              # Secure key loader
│   └── validator.js         # Key validation and testing
├── scripts/
│   └── check-keys.js        # Setup wizard/key checker
├── src/
│   ├── index.js             # Main application entry
│   ├── ai/                  # AI integration modules
│   ├── voice/               # Voice interaction
│   ├── calendar/            # Calendar integration
│   ├── security/            # Cybersecurity features
│   └── blueprints/          # Blueprint handling
└── docs/
    └── API_SERVICES.md      # Detailed API documentation
```

## Required API Keys

### Essential (Required)
- ✅ **OpenAI API** - AI conversations and content generation
- ✅ **ElevenLabs** - Text-to-speech
- ✅ **Deepgram** - Speech-to-text
- ✅ **MongoDB Atlas** - Database storage

### Recommended (Enhanced Features)
- 🟡 **Twilio** - Phone calls and SMS
- 🟡 **Google Calendar API** - Calendar management
- 🟡 **Google Cloud Vision** - Blueprint analysis
- 🟡 **VirusTotal** - Malware scanning
- 🟡 **Perplexity AI** - Real-time search

### Optional (Additional Capabilities)
- ⚪ **Anthropic Claude** - Alternative AI model
- ⚪ **Google Gemini** - Multimodal AI
- ⚪ **Pinecone** - Vector database
- ⚪ **Wolfram Alpha** - Computational knowledge
- ⚪ **AWS S3** - File storage

See **[SETUP_GUIDE.md](SETUP_GUIDE.md)** for detailed instructions on obtaining each API key.

## Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Step-by-step guide for obtaining API keys
- **[docs/API_SERVICES.md](docs/API_SERVICES.md)** - Detailed API service documentation

## Scripts

```bash
# Check API key configuration
npm run check-keys

# Start the Smart Assistant
npm start

# Development mode (same as start)
npm run dev

# Run setup wizard
npm run setup
```

## Security Best Practices

1. **Never commit `.env`** - It's already in `.gitignore`
2. **Rotate keys regularly** - Change API keys periodically
3. **Use environment-specific keys** - Different keys for dev/prod
4. **Monitor API usage** - Set up billing alerts
5. **Keep dependencies updated** - Run `npm update` regularly

## Features by Module

### AI Module
- Natural language conversations
- Text analysis and summarization
- Content generation
- Multiple AI model support (GPT-4, Claude, Gemini)

### Voice Module
- Text-to-speech with natural voices
- Speech-to-text transcription
- Phone call automation
- SMS messaging

### Calendar Module
- Event creation and management
- Schedule optimization
- Availability checking
- Multi-calendar support

### Security Module
- File malware scanning
- URL threat analysis
- Password breach checking
- Real-time threat monitoring

### Blueprint Module
- Technical drawing analysis
- OCR for blueprints
- Diagram generation
- Blueprint comparison

## Contributing

Contributions are welcome! Please ensure:
- No API keys are committed
- Code follows existing patterns
- Documentation is updated
- Tests pass (when implemented)

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
1. Check the [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Review [docs/API_SERVICES.md](docs/API_SERVICES.md)
3. Open an issue on GitHub

---

**Built with ❤️ for intelligent automation**
