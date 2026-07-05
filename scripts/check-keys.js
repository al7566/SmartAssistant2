#!/usr/bin/env node

/**
 * Smart Assistant Setup Wizard
 * Checks which API keys are configured and validates their format
 * Provides color-coded status output and helpful guidance
 */

import chalk from 'chalk';
import ora from 'ora';
import config from '../config/keys.js';
import {
  validateKeyFormat,
  testOpenAI,
  testElevenLabs,
  testDeepgram,
  testTwilio,
  testMongoDB,
  testVirusTotal,
  testPerplexity,
} from '../config/validator.js';

// Service definitions with their configuration paths and priority
const services = [
  // Essential Services (Required for core functionality)
  {
    category: 'Essential',
    name: 'OpenAI (GPT-4)',
    path: 'ai.openai.apiKey',
    validator: 'openai',
    testFn: testOpenAI,
    priority: 'required',
    signupUrl: 'https://platform.openai.com/api-keys',
  },
  {
    category: 'Essential',
    name: 'ElevenLabs (Text-to-Speech)',
    path: 'voice.elevenLabs.apiKey',
    validator: 'generic',
    testFn: testElevenLabs,
    priority: 'required',
    signupUrl: 'https://elevenlabs.io/',
  },
  {
    category: 'Essential',
    name: 'Deepgram (Speech-to-Text)',
    path: 'voice.deepgram.apiKey',
    validator: 'generic',
    testFn: testDeepgram,
    priority: 'required',
    signupUrl: 'https://console.deepgram.com/',
  },
  {
    category: 'Essential',
    name: 'MongoDB Atlas',
    path: 'database.mongodb.uri',
    validator: 'mongodb',
    testFn: testMongoDB,
    priority: 'required',
    signupUrl: 'https://www.mongodb.com/cloud/atlas/register',
  },

  // Communication Services
  {
    category: 'Communication',
    name: 'Twilio (Phone/SMS)',
    path: 'voice.twilio.accountSid',
    validator: 'twilioSid',
    testFn: async (sid) => {
      const token = config.voice.twilio.authToken;
      return testTwilio(sid, token);
    },
    priority: 'recommended',
    signupUrl: 'https://www.twilio.com/try-twilio',
  },
  {
    category: 'Communication',
    name: 'Twilio Auth Token',
    path: 'voice.twilio.authToken',
    validator: 'generic',
    priority: 'recommended',
  },
  {
    category: 'Communication',
    name: 'Twilio Phone Number',
    path: 'voice.twilio.phoneNumber',
    validator: 'twilioPhone',
    priority: 'recommended',
  },

  // Calendar Services
  {
    category: 'Calendar',
    name: 'Google Calendar',
    path: 'calendar.google.clientId',
    validator: 'generic',
    priority: 'recommended',
    signupUrl: 'https://console.cloud.google.com/apis/credentials',
  },
  {
    category: 'Calendar',
    name: 'Google Calendar Secret',
    path: 'calendar.google.clientSecret',
    validator: 'generic',
    priority: 'recommended',
  },

  // Blueprint Services
  {
    category: 'Blueprints',
    name: 'Google Cloud Vision',
    path: 'blueprints.googleVision.apiKey',
    validator: 'google',
    priority: 'recommended',
    signupUrl: 'https://console.cloud.google.com/',
  },

  // Cybersecurity Services
  {
    category: 'Security',
    name: 'VirusTotal',
    path: 'cybersecurity.virusTotal.apiKey',
    validator: 'generic',
    testFn: testVirusTotal,
    priority: 'recommended',
    signupUrl: 'https://www.virustotal.com/gui/join-us',
  },
  {
    category: 'Security',
    name: 'Cloudflare',
    path: 'cybersecurity.cloudflare.apiKey',
    validator: 'generic',
    priority: 'optional',
    signupUrl: 'https://dash.cloudflare.com/sign-up',
  },

  // Knowledge Services
  {
    category: 'Knowledge',
    name: 'Perplexity AI',
    path: 'knowledge.perplexity.apiKey',
    validator: 'perplexity',
    testFn: testPerplexity,
    priority: 'recommended',
    signupUrl: 'https://www.perplexity.ai/',
  },
  {
    category: 'Knowledge',
    name: 'Pinecone Vector DB',
    path: 'knowledge.pinecone.apiKey',
    validator: 'generic',
    priority: 'optional',
    signupUrl: 'https://www.pinecone.io/',
  },
  {
    category: 'Knowledge',
    name: 'Wolfram Alpha',
    path: 'knowledge.wolframAlpha.appId',
    validator: 'generic',
    priority: 'optional',
    signupUrl: 'https://products.wolframalpha.com/api/',
  },

  // Storage Services
  {
    category: 'Storage',
    name: 'AWS S3',
    path: 'database.aws.accessKeyId',
    validator: 'awsAccessKey',
    priority: 'optional',
    signupUrl: 'https://aws.amazon.com/',
  },
  {
    category: 'Storage',
    name: 'AWS Secret Key',
    path: 'database.aws.secretAccessKey',
    validator: 'generic',
    priority: 'optional',
  },

  // Optional AI Services
  {
    category: 'Optional AI',
    name: 'Anthropic Claude',
    path: 'ai.anthropic.apiKey',
    validator: 'anthropic',
    priority: 'optional',
    signupUrl: 'https://console.anthropic.com/',
  },
  {
    category: 'Optional AI',
    name: 'Google Gemini',
    path: 'ai.gemini.apiKey',
    validator: 'google',
    priority: 'optional',
    signupUrl: 'https://makersuite.google.com/app/apikey',
  },
];

/**
 * Get configuration value from dot-notation path
 */
function getConfigValue(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], config);
}

/**
 * Check and validate a single service
 */
async function checkService(service, testConnection = false) {
  const value = getConfigValue(service.path);
  const isConfigured = value && value !== '';

  let status = {
    name: service.name,
    configured: isConfigured,
    valid: false,
    message: '',
    priority: service.priority,
  };

  if (!isConfigured) {
    status.message = 'Not configured';
    return status;
  }

  // Validate format
  const formatValidation = validateKeyFormat(value, service.validator);
  status.valid = formatValidation.valid;
  status.message = formatValidation.message;

  // Test connection if requested and test function exists
  if (testConnection && service.testFn && formatValidation.valid) {
    try {
      const testResult = await service.testFn(value);
      status.valid = testResult.success;
      status.message = testResult.message;
    } catch (error) {
      status.valid = false;
      status.message = 'Connection test failed';
    }
  }

  return status;
}

/**
 * Display service status with color coding
 */
function displayStatus(status) {
  const { name, configured, valid, message, priority } = status;

  let icon, color, text;

  if (!configured) {
    icon = '❌';
    color = chalk.red;
    text = message;
  } else if (valid) {
    icon = '✅';
    color = chalk.green;
    text = message;
  } else {
    icon = '⚠️';
    color = chalk.yellow;
    text = message;
  }

  const priorityBadge =
    priority === 'required'
      ? chalk.red.bold('[REQUIRED]')
      : priority === 'recommended'
      ? chalk.yellow('[RECOMMENDED]')
      : chalk.gray('[OPTIONAL]');

  console.log(`  ${icon} ${priorityBadge} ${color(name)}: ${color(text)}`);
}

/**
 * Main setup wizard function
 */
async function runSetupWizard() {
  console.log('\n' + chalk.cyan.bold('━'.repeat(70)));
  console.log(chalk.cyan.bold('  🤖 Smart Assistant 2 - Setup Wizard'));
  console.log(chalk.cyan.bold('━'.repeat(70)) + '\n');

  console.log(chalk.white('Checking API key configuration...\n'));

  // Group services by category
  const categorized = {};
  services.forEach((service) => {
    if (!categorized[service.category]) {
      categorized[service.category] = [];
    }
    categorized[service.category].push(service);
  });

  const results = {
    total: services.length,
    configured: 0,
    valid: 0,
    required: 0,
    requiredConfigured: 0,
  };

  // Check each service
  for (const [category, serviceList] of Object.entries(categorized)) {
    console.log(chalk.cyan.bold(`\n${category} Services:`));

    for (const service of serviceList) {
      const spinner = ora(`Checking ${service.name}...`).start();
      const status = await checkService(service, true);
      spinner.stop();

      displayStatus(status);

      if (service.priority === 'required') {
        results.required++;
        if (status.configured) results.requiredConfigured++;
      }

      if (status.configured) results.configured++;
      if (status.valid) results.valid++;
    }
  }

  // Display summary
  console.log('\n' + chalk.cyan.bold('━'.repeat(70)));
  console.log(chalk.cyan.bold('  Summary'));
  console.log(chalk.cyan.bold('━'.repeat(70)) + '\n');

  console.log(
    `  📊 Total Services: ${results.total} | Configured: ${chalk.green(
      results.configured
    )} | Valid: ${chalk.green(results.valid)}`
  );
  console.log(
    `  🔑 Required Services: ${results.required} | Configured: ${
      results.requiredConfigured === results.required
        ? chalk.green(results.requiredConfigured)
        : chalk.red(results.requiredConfigured)
    }/${results.required}`
  );

  // Provide guidance
  console.log('\n' + chalk.cyan.bold('━'.repeat(70)));
  console.log(chalk.cyan.bold('  Next Steps'));
  console.log(chalk.cyan.bold('━'.repeat(70)) + '\n');

  if (results.requiredConfigured < results.required) {
    console.log(
      chalk.yellow.bold('  ⚠️  Some required services are not configured!')
    );
    console.log(
      chalk.white(
        '  Please configure the missing required services to use the assistant.\n'
      )
    );
    console.log(
      chalk.white('  1. Copy .env.example to .env: ') +
        chalk.cyan('cp .env.example .env')
    );
    console.log(
      chalk.white('  2. Edit .env and add your API keys')
    );
    console.log(
      chalk.white('  3. Run this wizard again: ') +
        chalk.cyan('npm run check-keys')
    );
    console.log(
      chalk.white('\n  📖 See SETUP_GUIDE.md for detailed instructions on obtaining API keys.\n')
    );
  } else {
    console.log(
      chalk.green.bold('  ✅ All required services are configured!')
    );
    console.log(
      chalk.white('\n  You can now start the Smart Assistant: ') +
        chalk.cyan('npm start')
    );

    if (results.configured < results.total) {
      console.log(
        chalk.white(
          '\n  💡 Tip: Configure optional services for enhanced functionality.'
        )
      );
      console.log(
        chalk.white('     See SETUP_GUIDE.md for more information.\n')
      );
    }
  }

  console.log(chalk.cyan.bold('━'.repeat(70)) + '\n');
}

// Run the wizard
runSetupWizard().catch((error) => {
  console.error(chalk.red.bold('\n❌ Setup wizard failed:'), error.message);
  process.exit(1);
});
