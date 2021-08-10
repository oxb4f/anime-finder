import { Telegraf, Context } from 'telegraf';
import { Update } from 'typegram';

import { api } from '../../api';

export default function onPhoto(bot: Telegraf<Context<Update>>): void {
  bot.on('photo', async (ctx) => {
    const photoURL = (
      await ctx.telegram.getFileLink(
        await ctx.telegram.getFile(ctx.message.photo[0].file_id),
      )
    ).toString();

    try {
      const res = await api.getAnimeByImage(photoURL);

      await ctx.reply(res.data.result[0].anilist.toString());
    } catch (err) {
      console.error(err);
    }
  });
}
