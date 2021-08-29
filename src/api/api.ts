import axios from 'axios';
import { stringify as makeQueryString } from 'qs';

import { AnimeInfo } from './types';

export class Api {
  private readonly baseTraceMoeUrl: string = 'https://api.trace.moe/';
  private readonly searchEndpoint: string = 'search/';
  private readonly baseAnilistUrl: string = 'https://graphql.anilist.co';
  private readonly anilistSearchQuery: string = `
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
    const anilistId = (
      await axios.get(
        `${this.baseTraceMoeUrl}${this.searchEndpoint}?${makeQueryString({
          url: photoURL,
        })}`,
      )
    ).data.result[0].anilist;

    return this.getAnimeInfoByAnilistId(anilistId);
  };

  public getAnimeInfoByAnilistId = async (
    anilistId: number,
  ): Promise<AnimeInfo> => {
    const res = await axios.post(this.baseAnilistUrl, {
      query: this.anilistSearchQuery,
      variables: { id: anilistId },
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
