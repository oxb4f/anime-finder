import * as dotenv from 'dotenv';
import * as findConfig from 'find-config';
import * as fs from 'fs';

const envConfig = dotenv.parse(fs.readFileSync(findConfig('.env') as string));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

import { bot } from './bot';
import { handlers } from './handlers';

handlers.forEach((handler) => handler(bot));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
