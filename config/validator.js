/**
 * API Key Validation Module
 * Validates format and tests connectivity for various API services
 */

import axios from 'axios';

/**
 * Validation rules for different API key formats
 */
const keyFormatValidators = {
  // OpenAI keys start with 'sk-' (legacy) or 'sk-proj-' (new format)
  openai: (key) => /^sk-(proj-)?[A-Za-z0-9_-]{32,}$/.test(key),
  
  // Anthropic keys start with 'sk-ant-'
  anthropic: (key) => /^sk-ant-[A-Za-z0-9_-]{32,}$/.test(key),
  
  // Google API keys start with 'AIza'
  google: (key) => /^AIza[A-Za-z0-9_-]{35}$/.test(key),
  
  // Twilio Account SID starts with 'AC'
  twilioSid: (key) => /^AC[a-f0-9]{32}$/.test(key),
  
  // Twilio phone number format
  twilioPhone: (key) => /^\+?[1-9]\d{1,14}$/.test(key),
  
  // MongoDB connection string
  mongodb: (key) => /^mongodb(\+srv)?:\/\/.+/.test(key),
  
  // AWS Access Key ID format
  awsAccessKey: (key) => /^AKIA[A-Z0-9]{16}$/.test(key),
  
  // Perplexity API key starts with 'pplx-'
  perplexity: (key) => /^pplx-[A-Za-z0-9_-]{32,}$/.test(key),
  
  // Generic validation for most API keys (at least 20 chars, alphanumeric + common symbols)
  generic: (key) => key && key.length >= 20 && /^[A-Za-z0-9_\-\.]+$/.test(key),
  
  // URL validation
  url: (key) => {
    try {
      new URL(key);
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * Validate API key format
 * @param {string} key - The API key to validate
 * @param {string} type - The type of key (openai, google, generic, etc.)
 * @returns {Object} { valid: boolean, message: string }
 */
export function validateKeyFormat(key, type = 'generic') {
  if (!key || key.trim() === '') {
    return { valid: false, message: 'Key is empty or missing' };
  }

  const validator = keyFormatValidators[type] || keyFormatValidators.generic;
  const isValid = validator(key);

  return {
    valid: isValid,
    message: isValid ? 'Format valid' : `Invalid ${type} key format`,
  };
}

/**
 * Test OpenAI API connection
 */
export async function testOpenAI(apiKey) {
  try {
    const response = await axios.get('https://api.openai.com/v1/models', {
      headers: { 'Authorization': `Bearer ${apiKey}` },
      timeout: 5000,
    });
    return { success: true, message: 'Connected successfully' };
  } catch (error) {
    return {
      success: false,
      message: error.response?.status === 401 ? 'Invalid API key' : 'Connection failed',
    };
  }
}

/**
 * Test Anthropic API connection
 */
export async function testAnthropic(apiKey) {
  try {
    // Anthropic doesn't have a simple endpoint to test, so we validate format
    const formatCheck = validateKeyFormat(apiKey, 'anthropic');
    if (!formatCheck.valid) {
      return { success: false, message: formatCheck.message };
    }
    return { success: true, message: 'Format valid (connection test skipped)' };
  } catch (error) {
    return { success: false, message: 'Validation failed' };
  }
}

/**
 * Test ElevenLabs API connection
 */
export async function testElevenLabs(apiKey) {
  try {
    const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
      headers: { 'xi-api-key': apiKey },
      timeout: 5000,
    });
    return { success: true, message: 'Connected successfully' };
  } catch (error) {
    return {
      success: false,
      message: error.response?.status === 401 ? 'Invalid API key' : 'Connection failed',
    };
  }
}

/**
 * Test Deepgram API connection
 */
export async function testDeepgram(apiKey) {
  try {
    const response = await axios.get('https://api.deepgram.com/v1/projects', {
      headers: { 'Authorization': `Token ${apiKey}` },
      timeout: 5000,
    });
    return { success: true, message: 'Connected successfully' };
  } catch (error) {
    return {
      success: false,
      message: error.response?.status === 401 ? 'Invalid API key' : 'Connection failed',
    };
  }
}

/**
 * Test Twilio API connection
 */
export async function testTwilio(accountSid, authToken) {
  try {
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    const response = await axios.get(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}.json`, {
      headers: { 'Authorization': `Basic ${auth}` },
      timeout: 5000,
    });
    return { success: true, message: 'Connected successfully' };
  } catch (error) {
    return {
      success: false,
      message: error.response?.status === 401 ? 'Invalid credentials' : 'Connection failed',
    };
  }
}

/**
 * Test MongoDB connection
 */
export async function testMongoDB(uri) {
  // MongoDB connection testing requires the mongodb driver
  // For now, we'll just validate the URI format
  const formatCheck = validateKeyFormat(uri, 'mongodb');
  return {
    success: formatCheck.valid,
    message: formatCheck.valid ? 'URI format valid' : 'Invalid MongoDB URI format',
  };
}

/**
 * Test VirusTotal API connection
 */
export async function testVirusTotal(apiKey) {
  try {
    const response = await axios.get('https://www.virustotal.com/api/v3/users/current', {
      headers: { 'x-apikey': apiKey },
      timeout: 5000,
    });
    return { success: true, message: 'Connected successfully' };
  } catch (error) {
    return {
      success: false,
      message: error.response?.status === 401 ? 'Invalid API key' : 'Connection failed',
    };
  }
}

/**
 * Test Perplexity API connection
 */
export async function testPerplexity(apiKey) {
  try {
    // Perplexity requires a POST request with a body
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      }
    );
    return { success: true, message: 'Connected successfully' };
  } catch (error) {
    return {
      success: false,
      message: error.response?.status === 401 ? 'Invalid API key' : 'Connection failed',
    };
  }
}

/**
 * Generic API test function
 * @param {string} name - Service name
 * @param {string} key - API key
 * @param {Function} testFn - Custom test function
 * @returns {Promise<Object>} Test result
 */
export async function testService(name, key, testFn) {
  if (!key) {
    return { success: false, message: 'Not configured' };
  }

  try {
    if (testFn) {
      return await testFn(key);
    }
    return { success: true, message: 'Configured (test skipped)' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export default {
  validateKeyFormat,
  testOpenAI,
  testAnthropic,
  testElevenLabs,
  testDeepgram,
  testTwilio,
  testMongoDB,
  testVirusTotal,
  testPerplexity,
  testService,
};
