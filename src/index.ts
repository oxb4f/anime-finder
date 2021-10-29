import { bot } from './bot';

bot.launch().catch(console.error.bind(console));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
