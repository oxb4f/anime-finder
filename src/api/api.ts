import axios from 'axios';
import { AxiosResponse } from 'axios';
import * as qs from 'qs';

export default class API {
  private readonly baseURL: string = 'https://api.trace.moe/';
  private readonly searchEndpoint: string = 'search/';

  public async getAnimeByImage(
    photoURL: string,
  ): Promise<AxiosResponse> {
    return axios.get(
      `${this.baseURL + this.searchEndpoint}?${qs.stringify({ url: photoURL })}`,
    );
  }
}
