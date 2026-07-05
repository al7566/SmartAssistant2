#!/usr/bin/env node

/**
 * Smart Assistant 2 - Main Entry Point
 * Comprehensive AI-powered assistant with multiple capabilities
 */

import chalk from 'chalk';
import config from '../config/keys.js';
import AIModule from './ai/index.js';
import VoiceModule from './voice/index.js';
import CalendarModule from './calendar/index.js';
import SecurityModule from './security/index.js';
import BlueprintModule from './blueprints/index.js';

console.log(chalk.cyan.bold('\n━'.repeat(70)));
console.log(chalk.cyan.bold('  🤖 Smart Assistant 2'));
console.log(chalk.cyan.bold('━'.repeat(70)) + '\n');

/**
 * Initialize the Smart Assistant
 */
async function initialize() {
  console.log(chalk.white('Initializing Smart Assistant modules...\n'));

  // Check for essential services
  const essentialServices = [
    { name: 'OpenAI', key: config.ai.openai.apiKey },
    { name: 'Database', key: config.database.mongodb.uri },
  ];

  const missingServices = essentialServices.filter((service) => !service.key);

  if (missingServices.length > 0) {
    console.log(chalk.red.bold('❌ Missing required configuration:\n'));
    missingServices.forEach((service) => {
      console.log(chalk.red(`  • ${service.name}`));
    });
    console.log(
      chalk.yellow(
        '\n⚠️  Please run the setup wizard to configure your API keys:'
      )
    );
    console.log(chalk.cyan('   npm run check-keys\n'));
    process.exit(1);
  }

  // Initialize modules
  const modules = [];

  try {
    // AI Module (Core)
    if (config.ai.openai.apiKey) {
      console.log(chalk.green('✅ AI Module: Ready'));
      modules.push(new AIModule());
    }

    // Voice Module
    if (config.voice.elevenLabs.apiKey && config.voice.deepgram.apiKey) {
      console.log(chalk.green('✅ Voice Module: Ready'));
      modules.push(new VoiceModule());
    } else {
      console.log(chalk.yellow('⚠️  Voice Module: Partially configured'));
    }

    // Calendar Module
    if (config.calendar.google.clientId) {
      console.log(chalk.green('✅ Calendar Module: Ready'));
      modules.push(new CalendarModule());
    } else {
      console.log(chalk.gray('○  Calendar Module: Not configured'));
    }

    // Security Module
    if (config.cybersecurity.virusTotal.apiKey) {
      console.log(chalk.green('✅ Security Module: Ready'));
      modules.push(new SecurityModule());
    } else {
      console.log(chalk.gray('○  Security Module: Not configured'));
    }

    // Blueprint Module
    if (config.blueprints.googleVision.apiKey) {
      console.log(chalk.green('✅ Blueprint Module: Ready'));
      modules.push(new BlueprintModule());
    } else {
      console.log(chalk.gray('○  Blueprint Module: Not configured'));
    }

    console.log(chalk.cyan.bold('\n━'.repeat(70)));
    console.log(
      chalk.green.bold(
        `\n✨ Smart Assistant initialized with ${modules.length} active modules!\n`
      )
    );
    console.log(chalk.white('Ready to assist you with:\n'));
    console.log(chalk.white('  • AI-powered conversations and analysis'));
    if (config.voice.elevenLabs.apiKey)
      console.log(chalk.white('  • Voice interaction and phone calls'));
    if (config.calendar.google.clientId)
      console.log(chalk.white('  • Calendar and scheduling management'));
    if (config.cybersecurity.virusTotal.apiKey)
      console.log(chalk.white('  • Cybersecurity monitoring and protection'));
    if (config.blueprints.googleVision.apiKey)
      console.log(chalk.white('  • Blueprint creation and analysis'));
    console.log(chalk.white('  • Universal knowledge base access\n'));

    console.log(chalk.cyan('💡 Type ') + chalk.yellow('help') + chalk.cyan(' for available commands\n'));
    console.log(chalk.cyan.bold('━'.repeat(70)) + '\n');

    // Start the assistant (placeholder for actual implementation)
    await startAssistant(modules);
  } catch (error) {
    console.error(chalk.red.bold('\n❌ Initialization failed:'), error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

/**
 * Start the assistant main loop
 */
async function startAssistant(modules) {
  console.log(chalk.green('Smart Assistant is running...\n'));
  console.log(
    chalk.yellow('Note: This is a placeholder. Full implementation coming soon!\n')
  );
  console.log(
    chalk.white(
      'The assistant is now ready to be extended with actual functionality.\n'
    )
  );

  // Placeholder - In a real implementation, this would:
  // 1. Set up a REPL or web interface
  // 2. Listen for voice commands
  // 3. Handle scheduled tasks
  // 4. Monitor security threats
  // 5. Process user requests through the various modules
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\n👋 Shutting down Smart Assistant...'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n\n👋 Shutting down Smart Assistant...'));
  process.exit(0);
});

// Run the application
initialize().catch((error) => {
  console.error(chalk.red.bold('\n❌ Fatal error:'), error.message);
  process.exit(1);
});
