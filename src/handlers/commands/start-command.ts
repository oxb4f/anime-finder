import { Telegraf, Context } from 'telegraf';
import { Update } from 'typegram';

export default function startCommand(bot: Telegraf<Context<Update>>): void {
  bot.command('/start', async (ctx) => {
    await ctx.reply('Send me photo from anime for getting info about it');
  });
}
