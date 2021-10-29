import axios from 'axios';
import { stringify as makeQueryString } from 'qs';

export interface AnimeInfo {
  readonly titleEnglish: string | null;
  readonly titleNative: string;
  readonly episodes: number;
  readonly description: string;
  readonly episodeDuration: number;
  readonly genres: Array<string>;
  readonly averageScore: number;
}

export class Api {
  protected readonly _baseTraceMoeUrl: string = 'https://api.trace.moe/';
  protected readonly _searchEndpoint: string = 'search/';
  protected readonly _baseAnilistUrl: string = 'https://graphql.anilist.co';
  protected readonly _anilistSearchQuery: string = `
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
        `${this._baseTraceMoeUrl}${this._searchEndpoint}?${makeQueryString({
          url: photoURL,
        })}`,
      )
    ).data.result[0].anilist;

    return this.getAnimeInfoByAnilistId(anilistId);
  };

  public getAnimeInfoByAnilistId = async (
    anilistId: number,
  ): Promise<AnimeInfo> => {
    const res = await axios.post(this._baseAnilistUrl, {
      query: this._anilistSearchQuery,
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
    } as AnimeInfo;
  };
}
