import { Telegraf } from 'telegraf';
import logger from '../config/logger';

const botToken = process.env.TELEGRAM_BOT_TOKEN;

logger.info(`TELEGRAM_BOT_TOKEN in notificationService: ${botToken ? 'Set' : 'Not set'}`);

if (!botToken) {
  logger.error('TELEGRAM_BOT_TOKEN is not set in the environment variables');
  process.exit(1);
}

const bot = new Telegraf(botToken);

export const sendPushNotification = async (telegramId: string, message: string) => {
  try {
    await bot.telegram.sendMessage(telegramId, message);
  } catch (error) {
    logger.error('Error sending push notification:', error);
  }
};

export const sendBulkNotification = async (telegramIds: string[], message: string) => {
  for (const telegramId of telegramIds) {
    await sendPushNotification(telegramId, message);
  }
};

// Initialize bot
bot.launch().then(() => {
  logger.info('Telegram bot initialized successfully');
}).catch((error) => {
  logger.error('Error initializing Telegram bot:', error);
  if (error instanceof Error) {
    logger.error('Error stack:', error.stack);
  }
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));