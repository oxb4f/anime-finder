import { Telegraf, Context } from 'telegraf';
import { Update } from 'typegram';

import startCommand from './start-command';

const commandHandlers: ReadonlyArray<(bot: Telegraf<Context<Update>>) => void> =
  [startCommand];

export { commandHandlers, startCommand };
