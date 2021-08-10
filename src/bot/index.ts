import { Telegraf } from 'telegraf';

if (process.env.BOT_TOKEN === undefined) {
  throw new Error('BOT_TOKEN is not specified');
}

const bot = new Telegraf(process.env.BOT_TOKEN);

export { bot };
