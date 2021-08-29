import { Telegraf, Context } from 'telegraf';
import { Update } from 'typegram';

import { api } from '../../api';

export function onPhoto(bot: Telegraf<Context<Update>>): void {
  bot.on('photo', async (ctx) => {
    const photoUrl = (
      await ctx.telegram.getFileLink(ctx.message.photo[0].file_id)
    ).toString();

    try {
      const res = await api.getAnimeInfoByImage(photoUrl);

      const animeInfo = `<b>English title</b>: ${res.titleEnglish}
<b>Native title</b>: ${res.titleNative}
<b>Description:</b>\n${res.description.replace(/<br>/g, '')}
<b>Episodes:</b> ${res.episodes}
<b>Episode duration:</b> ~${res.episodeDuration}
<b>Genres</b>: ${res.genres.map((tag) => '#' + tag).join(', ')}
<b>Score</b>: ${res.averageScore}
 `;
      await ctx.telegram.sendMessage(ctx.message.chat.id, animeInfo, {
        parse_mode: 'HTML',
      });
    } catch (err) {
      console.error(err);
    }
  });
}
