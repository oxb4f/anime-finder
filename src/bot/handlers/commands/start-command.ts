import { Telegraf, Context } from 'telegraf';
import { Update } from 'typegram';

export function startCommand(bot: Telegraf<Context<Update>>): void {
  bot.command('/start', (ctx) =>
    ctx.reply('Send me an anime photo and find out where the photo came from'),
  );
}
