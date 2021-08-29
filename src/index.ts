import { bot } from './bot';
import { handlers } from './handlers';

handlers.forEach((handler) => handler(bot));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
