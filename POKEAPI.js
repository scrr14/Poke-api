const pokemonsGlobal = [];
const pokemonGrid = document.querySelector("#pokemon-grid");
const searchPokemon = document.querySelector("#search");

const cleanView = () => {
    pokemonGrid.innerHTML = '';
}
searchPokemon.addEventListener('keyup', () => {
    const inputValue = searchPokemon.value;
    console.log(inputValue);
    let pokemonsGlobal2 = searchByName(inputValue);
    console.log(pokemonsGlobal2);
    cleanView();
    renderPokemonCard(pokemonsGlobal2);
    
});

const searchByName = (searchParamater) => {
    const filteredPokemon = pokemonsGlobal.filter((pokemon)=> {
        if(pokemon.name.includes(searchParamater)) {
            return pokemon
        }
    })
    return filteredPokemon
}

const getPokemons = async () => {
    const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0"

    );
    const responseJson = await response.json();
    const pokemons = responseJson.results;
    // console.log(pokemons);

    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        const pokemonUrl = pokemon.url;
        const response = await fetch(pokemonUrl);
        const responseJson = await response.json();
        normalizePokemons(responseJson, pokemon);
    }
    console.log(pokemonsGlobal);
    renderPokemonCard(pokemonsGlobal);
}; 

const normalizePokemons = (responseJson, pokemon) => {
    const img = responseJson.sprites.other["official-artwork"].front_default;

    const dateObjectPokemon = {
        name: pokemon.name,
        img: img,

    };
    pokemonsGlobal.push(dateObjectPokemon);
}


const renderPokemonCard = (array) => {
    for (let i = 0; i < array.length; i++) {
        const pokemonCard = document.createElement("div");
        pokemonCard.classList = "pokemon-card";
        pokemonCard.innerHTML = ` 
        <img src="${array[i].img}">
        <h2>${array[i].name}</h2>
        <h2>${array[i].stats}</h2>
        <h2>${array[i].types}</h2>`;


        pokemonGrid.appendChild(pokemonCard);
    }
};

getPokemons();
