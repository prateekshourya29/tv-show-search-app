export interface FetchResponse {
  score: number;
  show: {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    generes: string[];
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