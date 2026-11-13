export type Track = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: unknown;
  track_file: string;
  staredUser: number[];
};

export type Selection = {
  _id: number;
  name: string;
  items: number[];
  owner: number[];
};

export type User = {
  _id: number;
  email: string;
  username: string;
};

export type Tokens = {
  access: string;
  refresh: string;
};
