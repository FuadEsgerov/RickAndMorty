export interface IReqEpisodes {
  name?: string;
  episode?: string;
}

export interface IResEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface IResEpisodes {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: [IResEpisode];
}
