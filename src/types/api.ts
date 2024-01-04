export type ApiInfo = {
  count: number;
  pages: number;
  next: null | string;
  prev: null | string;
};

export type ApiCharacter = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
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
  created: string;
};

export type ApiResult =
  | {
      info: ApiInfo;
      results: ApiCharacter[];
      error?: undefined;
    }
  | {
      error: string;
      info?: undefined;
      results?: undefined;
    };
