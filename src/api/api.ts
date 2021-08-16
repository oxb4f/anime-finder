import axios from 'axios';
import { stringify as makeQueryString } from 'qs';

import { AnimeInfo } from './types';

export class API {
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
        episodes
        description
        duration
        genres
        averageScore
     }
   }
  `;

  public getAnimeInfoByImage = async (photoURL: string): Promise<AnimeInfo> => {
    const anilistID = (
      await axios.get(
        `${this._baseTraceMoeURL}${this._searchEndpoint}?${makeQueryString({
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
      episodes: res.data.data.Media.episodes,
      description: res.data.data.Media.description,
      episodeDuration: res.data.data.Media.duration,
      genres: res.data.data.Media.genres,
      averageScore: res.data.data.Media.averageScore,
    };
  };
}
