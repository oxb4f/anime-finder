import { Telegraf, Context } from 'telegraf';
import { Update } from 'typegram';

import { api } from '../../api';

export default function onPhoto(bot: Telegraf<Context<Update>>): void {
  bot.on('photo', async (ctx) => {
    const photoURL = (
      await ctx.telegram.getFileLink(ctx.message.photo[0].file_id)
    ).toString();

    try {
      const res = await api.getAnimeInfoByImage(photoURL);

      await ctx.reply(
        `English title: ${res.titleEnglish}\nNative title: ${res.titleNative}`,
      );
    } catch (err) {
      console.error(err);
    }
  });
}
