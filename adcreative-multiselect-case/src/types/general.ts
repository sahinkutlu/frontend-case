//https://rickandmortyapi.com/documentation/#character-schema
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: object;
  location: object;
  image: string;
  episode: any;
  url: string;
  created: string;
}

export interface CharacterResponse {
  info: any;
  results: Character[];
  error?: string; // used when filtered set is empty
}
