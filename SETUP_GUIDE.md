# Smart Assistant 2 - Setup Guide

This guide will walk you through obtaining and configuring all the API keys needed for the Smart Assistant.

## Quick Start

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the setup wizard to check your configuration:**
   ```bash
   npm run check-keys
   ```

4. **Add your API keys to `.env` as you obtain them**

5. **Start the assistant:**
   ```bash
   npm start
   ```

## Priority Guide

### 🔴 Essential (Required for core functionality)

These services are required for the Smart Assistant to run:

#### 1. OpenAI API (GPT-4)
- **Purpose:** AI conversations, text analysis, content generation
- **Free Tier:** $5 free credits for new accounts
- **Paid Tier:** Pay-as-you-go, ~$0.03 per 1K tokens

**How to get it:**
1. Visit https://platform.openai.com/signup
2. Create an account
3. Go to https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Copy the key (starts with `sk-proj-` or `sk-`)
6. Add to `.env`: `OPENAI_API_KEY=sk-proj-your-key-here`

#### 2. ElevenLabs API (Text-to-Speech)
- **Purpose:** Convert text to natural-sounding speech
- **Free Tier:** 10,000 characters/month
- **Paid Tier:** Starting at $5/month for 30,000 characters

**How to get it:**
1. Visit https://elevenlabs.io/
2. Sign up for an account
3. Go to your profile settings
4. Copy your API key
5. Add to `.env`: `ELEVENLABS_API_KEY=your-key-here`

#### 3. Deepgram API (Speech-to-Text)
- **Purpose:** Convert speech to text for voice commands
- **Free Tier:** $200 in free credits
- **Paid Tier:** Pay-as-you-go, $0.0043 per minute

**How to get it:**
1. Visit https://console.deepgram.com/signup
2. Create an account
3. Go to API Keys section
4. Create a new API key
5. Add to `.env`: `DEEPGRAM_API_KEY=your-key-here`

#### 4. MongoDB Atlas (Database)
- **Purpose:** Store user data, conversations, and settings
- **Free Tier:** 512MB storage (M0 cluster) - Forever free!
- **Paid Tier:** Starting at $9/month for 2GB

**How to get it:**
1. Visit https://www.mongodb.com/cloud/atlas/register
2. Create an account
3. Create a new cluster (choose the FREE M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Add to `.env`: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database`

---

### 🟡 Recommended (Enhanced functionality)

These services significantly enhance the assistant's capabilities:

#### 5. Twilio (Phone Calls & SMS)
- **Purpose:** Make phone calls and send text messages
- **Free Tier:** $15 trial credit
- **Paid Tier:** Pay-as-you-go

**How to get it:**
1. Visit https://www.twilio.com/try-twilio
2. Sign up and verify your phone number
3. Go to https://www.twilio.com/console
4. Copy your Account SID and Auth Token
5. Buy a phone number (use trial credit)
6. Add to `.env`:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your-token-here
   TWILIO_PHONE_NUMBER=+1234567890
   ```

#### 6. Google Calendar API
- **Purpose:** Manage appointments and scheduling
- **Free Tier:** Completely free!

**How to get it:**
1. Visit https://console.cloud.google.com/
2. Create a new project
3. Enable Google Calendar API
4. Go to Credentials → Create Credentials → OAuth client ID
5. Configure consent screen
6. Create OAuth 2.0 Client ID (Web application)
7. Add authorized redirect URI: `http://localhost:3000/oauth2callback`
8. Copy Client ID and Client Secret
9. Add to `.env`:
   ```
   GOOGLE_CALENDAR_CLIENT_ID=your-id.apps.googleusercontent.com
   GOOGLE_CALENDAR_CLIENT_SECRET=GOCSPX-your-secret
   GOOGLE_CALENDAR_REDIRECT_URI=http://localhost:3000/oauth2callback
   ```

#### 7. Google Cloud Vision API (Blueprint Analysis)
- **Purpose:** Analyze blueprints and technical drawings
- **Free Tier:** 1,000 units/month free
- **Paid Tier:** $1.50 per 1,000 units

**How to get it:**
1. Visit https://console.cloud.google.com/
2. Enable Cloud Vision API
3. Go to Credentials → Create Credentials → API Key
4. Copy the API key
5. Add to `.env`: `GOOGLE_CLOUD_VISION_API_KEY=AIzaxxxxxxxx`

#### 8. VirusTotal API (Security Scanning)
- **Purpose:** Scan files and URLs for malware
- **Free Tier:** 500 requests/day
- **Paid Tier:** Starting at $490/month for commercial use

**How to get it:**
1. Visit https://www.virustotal.com/gui/join-us
2. Create an account
3. Go to your profile → API Key
4. Copy your API key
5. Add to `.env`: `VIRUSTOTAL_API_KEY=your-key-here`

#### 9. Perplexity API (AI Search)
- **Purpose:** Real-time information retrieval with AI
- **Free Tier:** Limited free queries
- **Paid Tier:** Pay-as-you-go

**How to get it:**
1. Visit https://www.perplexity.ai/
2. Sign up for an account
3. Go to Settings → API
4. Generate an API key
5. Add to `.env`: `PERPLEXITY_API_KEY=pplx-your-key-here`

---

### ⚪ Optional (Additional features)

These services add extra capabilities but aren't required:

#### Anthropic Claude API
- **Purpose:** Alternative AI model for enhanced reasoning
- Visit https://console.anthropic.com/
- Add to `.env`: `ANTHROPIC_API_KEY=sk-ant-xxxxxxxx`

#### Google Gemini API
- **Purpose:** Another alternative AI model
- Visit https://makersuite.google.com/app/apikey
- Add to `.env`: `GOOGLE_GEMINI_API_KEY=AIzaxxxxxxxx`

#### Pinecone (Vector Database)
- **Purpose:** Advanced knowledge base storage
- Free Tier: 1 project, 100K vectors
- Visit https://www.pinecone.io/
- Add to `.env`: `PINECONE_API_KEY=your-key-here`

#### Wolfram Alpha API
- **Purpose:** Advanced calculations and data queries
- Visit https://products.wolframalpha.com/api/
- Add to `.env`: `WOLFRAM_ALPHA_APP_ID=XXXXXX-XXXXXXXXXX`

#### AWS S3 (File Storage)
- **Purpose:** Store files and media
- Free Tier: 5GB storage, 20,000 GET requests/month
- Visit https://aws.amazon.com/
- Add to `.env`:
  ```
  AWS_ACCESS_KEY_ID=AKIAxxxxxxxx
  AWS_SECRET_ACCESS_KEY=your-secret-key
  AWS_REGION=us-east-1
  AWS_S3_BUCKET=your-bucket-name
  ```

#### Cloudflare API
- **Purpose:** Security, CDN, DDoS protection
- Free Tier: Available
- Visit https://dash.cloudflare.com/sign-up

#### Auth0 or Supabase
- **Purpose:** User authentication
- Both have generous free tiers
- Auth0: https://auth0.com/signup
- Supabase: https://app.supabase.com/

---

## Configuration Tips

### Security Best Practices

1. **Never commit your `.env` file** - It's already in `.gitignore`
2. **Rotate keys regularly** - Change your API keys every few months
3. **Use environment-specific keys** - Different keys for development/production
4. **Monitor usage** - Check your API dashboards for unusual activity
5. **Set up billing alerts** - Get notified if costs exceed expectations

### Cost Management

1. **Start with free tiers** - Most services offer generous free tiers
2. **Set API rate limits** - Prevent runaway costs
3. **Monitor usage** - Check dashboards regularly
4. **Use caching** - Reduce redundant API calls
5. **Implement quotas** - Limit user requests per day

### Testing Your Setup

After adding keys to your `.env` file, run:

```bash
npm run check-keys
```

This will:
- ✅ Check which keys are configured
- ✅ Validate key formats
- ✅ Test connections to services
- ✅ Show you what features are available

---

## Troubleshooting

### "API key invalid" errors
- Double-check you copied the entire key
- Ensure no extra spaces or quotes
- Verify the key hasn't expired
- Check if you need to enable the API in the service dashboard

### Connection timeouts
- Check your internet connection
- Verify the service isn't experiencing downtime
- Some APIs have IP restrictions - check your dashboard

### Free tier limits exceeded
- Monitor your usage in service dashboards
- Consider upgrading or using alternative services
- Implement caching to reduce API calls

---

## Next Steps

Once you've configured your API keys:

1. **Run the setup wizard:** `npm run check-keys`
2. **Start the assistant:** `npm start`
3. **Read the API documentation:** `docs/API_SERVICES.md`
4. **Explore the features** and customize to your needs

---

## Support

If you encounter issues:
1. Check the service's documentation
2. Review the error messages in the setup wizard
3. Ensure all required services are configured
4. Check that your API keys have the necessary permissions

---

**Happy building! 🚀**
