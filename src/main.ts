import './style.css';
import { AxiosAdapter } from "./api/poke-api.adapter";
import { PokemonService } from "./services/pokemon.service";

const app = document.querySelector<HTMLDivElement>('#pokemon-grid')!;

const http = new AxiosAdapter();
const pokemonService = new PokemonService(http);

async function loadPokemons() {

  const pokemons = await pokemonService.getPokemonList();

  app.innerHTML = pokemons
    .map(({ name }) => `
      <div class="pokemon locked" data-name="${name}">
        <p>${name}</p>
      </div>
    `)
    .join('');
}

loadPokemons();

const input = document.querySelector<HTMLInputElement>("#search")!;

input.addEventListener("keydown", async (event: KeyboardEvent) => {
  if (event.key !== "Enter") return;

  const name = input.value.toLowerCase().trim();
  console.log("Buscando:", name);

  try {
    const detail = await pokemonService.getPokemonDetail(name);
    console.log("Detail:", detail);
    
    const description = await pokemonService.getPokemonDescription(detail.species.url);
    console.log("Description:", description);

    const pokemonDiv = document.querySelector(`[data-name="${name}"]`);
    console.log("Div encontrado:", pokemonDiv);

    if (pokemonDiv) {
      pokemonDiv.classList.remove("locked");
      pokemonDiv.innerHTML = `
        <img src="${detail.sprites.front_default}" />
        <p><strong>${detail.name}</strong></p>
        <small>${description}</small>
      `;
    }
  } catch (error) {
    console.error("Error completo:", error);
    alert("Pokémon no encontrado 😢");
  }
});