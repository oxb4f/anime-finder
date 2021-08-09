import { Context } from 'telegraf';

export default async function startHandler(ctx: Context) {
  await ctx.reply('Hello. This bot can help you to find anime');
}
