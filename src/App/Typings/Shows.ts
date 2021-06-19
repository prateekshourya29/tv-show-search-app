export interface FetchResponse {
  score: number;
  show: {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: any;
    averageRuntime: any;
    premiered: string;
    officialSite: string;
    schedule: any;
    rating: {
      average: number;
    };
    weight: any;
    network: any;
    webChannel: any;
    dvdCountry: any;
    externals: any;
    image: {
      medium: string;
      original: string;
    };
    summary: string;
    updated: any;
    _links: any;
  };
}

export interface CastDetails {
  person: {
    id: number;
    url: string;
    name: string;
    country: any;
    birthday: any;
    deathday: any;
    gender: any;
    image: {
      medium: string;
      original: string;
    };
    _links: any;
  };
  character: {
    id: number;
    url: string;
    name: string;
    image: {
      medium: string;
      original: string;
    };
    _links: any;
  };
  self: any;
  voice: any;
}