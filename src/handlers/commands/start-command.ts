import { Telegraf, Context } from 'telegraf';
import { Update } from 'typegram';

export default function startCommand(bot: Telegraf<Context<Update>>): void {
  bot.command('/start', async (ctx) => {
    await ctx.reply(
      'Send me an anime photo and find out where the photo came from',
    );
  });
}
