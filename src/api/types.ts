interface AnimeInfo {
  titleEnglish: string | null;
  titleNative: string;
  episodes: number;
  description: string;
  episodeDuration: number;
  genres: string[];
  averageScore: number;
}

export { AnimeInfo };
