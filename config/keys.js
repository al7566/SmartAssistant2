import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');

dotenv.config({ path: envPath });

/**
 * Centralized configuration object for all API keys and settings
 * All sensitive data is loaded from environment variables
 */
const config = {
  // Application Settings
  app: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    url: process.env.APP_URL || 'http://localhost:3000',
  },

  // Security
  security: {
    jwtSecret: process.env.JWT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    encryptionKey: process.env.ENCRYPTION_KEY,
  },

  // AI & Language Processing
  ai: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY,
    },
    gemini: {
      apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    },
  },

  // Voice & Communication
  voice: {
    elevenLabs: {
      apiKey: process.env.ELEVENLABS_API_KEY,
    },
    deepgram: {
      apiKey: process.env.DEEPGRAM_API_KEY,
    },
    assemblyAI: {
      apiKey: process.env.ASSEMBLYAI_API_KEY,
    },
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      phoneNumber: process.env.TWILIO_PHONE_NUMBER,
    },
  },

  // Calendar & Scheduling
  calendar: {
    google: {
      clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_CALENDAR_REDIRECT_URI,
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      tenantId: process.env.MICROSOFT_TENANT_ID,
    },
  },

  // Blueprint/Drawing Tools
  blueprints: {
    googleVision: {
      apiKey: process.env.GOOGLE_CLOUD_VISION_API_KEY,
    },
    // DALL-E uses the OpenAI key from ai.openai.apiKey
  },

  // Cybersecurity
  cybersecurity: {
    virusTotal: {
      apiKey: process.env.VIRUSTOTAL_API_KEY,
    },
    cloudflare: {
      apiKey: process.env.CLOUDFLARE_API_KEY,
      zoneId: process.env.CLOUDFLARE_ZONE_ID,
    },
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
    },
    supabase: {
      url: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_ANON_KEY,
      serviceKey: process.env.SUPABASE_SERVICE_KEY,
    },
    hibp: {
      apiKey: process.env.HIBP_API_KEY,
    },
  },

  // Knowledge & Search
  knowledge: {
    perplexity: {
      apiKey: process.env.PERPLEXITY_API_KEY,
    },
    bing: {
      apiKey: process.env.BING_SEARCH_API_KEY,
    },
    pinecone: {
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
      indexName: process.env.PINECONE_INDEX_NAME,
    },
    weaviate: {
      url: process.env.WEAVIATE_URL,
      apiKey: process.env.WEAVIATE_API_KEY,
    },
    wolframAlpha: {
      appId: process.env.WOLFRAM_ALPHA_APP_ID,
    },
  },

  // Database & Storage
  database: {
    mongodb: {
      uri: process.env.MONGODB_URI,
    },
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      s3Bucket: process.env.AWS_S3_BUCKET,
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
  },
};

/**
 * Get a nested configuration value safely
 * @param {string} path - Dot-notation path (e.g., 'ai.openai.apiKey')
 * @returns {any} The configuration value or undefined
 */
export function getConfig(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], config);
}

/**
 * Check if a specific service is configured
 * @param {string} path - Dot-notation path to the service config
 * @returns {boolean} True if the service has at least one configured key
 */
export function isServiceConfigured(path) {
  const serviceConfig = getConfig(path);
  if (!serviceConfig || typeof serviceConfig !== 'object') {
    return false;
  }
  
  return Object.values(serviceConfig).some(value => {
    return value !== undefined && value !== null && value !== '';
  });
}

export default config;
