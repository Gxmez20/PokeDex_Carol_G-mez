export interface PokemonListResponse {
  results: PokemonBasic[];
}

export interface PokemonBasic {
  name: string;
  url: string;
}