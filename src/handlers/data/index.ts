import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import { onPhoto } from './on-photo';

export const dataHandlers: ReadonlyArray<
  (bot: Telegraf<Context<Update>>) => void
> = [onPhoto];

export { onPhoto };
