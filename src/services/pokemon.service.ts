import type { HttpAdapter } from "../api/poke-api.adapter";
import type { PokemonListResponse, PokemonBasic } from "../interfaces/pokemon-list.interface";
import type { PokemonDetail, PokemonSpecies } from "../interfaces/pokemon-detail.interface";

export class PokemonService {
  private readonly http: HttpAdapter;

  constructor(http: HttpAdapter) {
    this.http = http;
  }

  async getPokemonList(): Promise<PokemonBasic[]> {
    const data = await this.http.get<PokemonListResponse>(
      "https://pokeapi.co/api/v2/pokemon?limit=20"
    );
    return data.results;
  }

  async getPokemonDetail(name: string): Promise<PokemonDetail> {
    const data = await this.http.get<PokemonDetail>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return data;
  }

  async getPokemonDescription(speciesUrl: string): Promise<string> {
    const data = await this.http.get<PokemonSpecies>(speciesUrl);

    const entry = data.flavor_text_entries.find(
      ({ language }) => language.name === "es"
    );

    return entry?.flavor_text ?? "Sin descripción disponible.";
  }
}