export interface IReqCharacters {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

export interface IResCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  firstSeenIn: string;
  firstEpisode: string;
  locationId: string;
  created: string;
}
export interface IResCharacters {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: [IResCharacter];
}
