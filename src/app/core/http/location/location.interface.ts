export interface IReqLocations {
  name?: string;
  type?: string;
  dimension?: string;
}
export interface IResLocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
export interface IResLocations {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: [IResLocation];
}
