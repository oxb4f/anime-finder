import { parse as parseEnv } from 'dotenv';
import { readFileSync } from 'fs';
import * as findConfig from 'find-config';

const envConfig = parseEnv(readFileSync(findConfig('.env') as string));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

import { bot } from './bot';
import { handlers } from './handlers';

handlers.forEach((handler) => handler(bot));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
