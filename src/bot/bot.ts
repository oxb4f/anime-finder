import { Telegraf } from 'telegraf';

if (process.env.BOT_TOKEN === undefined) {
  throw new Error('BOT_TOKEN is not specified');
}

export const bot = new Telegraf(process.env.BOT_TOKEN);
