import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import * as findConfig from 'find-config';

import { handlers } from './handlers';

dotenv.config({ path: findConfig('.env') as string | undefined });

if (process.env.BOT_TOKEN === undefined) {
  throw new Error('BOT_TOKEN is undefined');
}

const bot = new Telegraf(process.env.BOT_TOKEN);

for (const [command, handler] of Object.entries(handlers)) {
  bot.command(command, handler);
}

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
