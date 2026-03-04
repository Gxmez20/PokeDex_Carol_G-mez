/*crear interfaz PokemonDetail y PokemonSpecies*/ 

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  species: {
    url: string;
  };
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}