import axios from 'axios';
import * as qs from 'qs';

import { AnimeInfo } from './types';

export default class API {
  private readonly _baseTraceMoeURL: string = 'https://api.trace.moe/';
  private readonly _searchEndpoint: string = 'search/';
  private readonly _baseAnilistURL: string = 'https://graphql.anilist.co';
  private readonly _anilistSearchQuery: string = `
    query ($id: Int) {
      Media (id: $id, type: ANIME) {
        id
        title {
          english
          native
        }
     }
   }
  `;

  public getAnimeInfoByImage = async (photoURL: string): Promise<AnimeInfo> => {
    const anilistID = (
      await axios.get(
        `${this._baseTraceMoeURL}${this._searchEndpoint}?${qs.stringify({
          url: photoURL,
        })}`,
      )
    ).data.result[0].anilist;

    return this.getAnimeInfoByAnilistID(anilistID);
  };

  public getAnimeInfoByAnilistID = async (
    anilistID: number,
  ): Promise<AnimeInfo> => {
    const res = await axios.post(this._baseAnilistURL, {
      query: this._anilistSearchQuery,
      variables: { id: anilistID },
    });

    return {
      titleEnglish: res.data.data.Media.title.english,
      titleNative: res.data.data.Media.title.native,
    };
  };
}
