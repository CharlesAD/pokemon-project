document.getElementById('pokemonSearchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('pokemonName').value.trim().toLowerCase();
    fetchPokemonData(pokemonName);
});

function fetchPokemonData(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Pokémon not found: ${pokemonName}`);
            }
            return response.json();
        })
        .then(data => displayPokemonData(data))
        .catch(error => displayError(error));
}

function displayPokemonData(pokemon) {
    const displayDiv = document.getElementById('pokemonInfo');
    const types = pokemon.types.map(type => type.type.name).join(', ');
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');

    displayDiv.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Types:</strong> ${types}</p>
        <p><strong>Abilities:</strong> ${abilities}</p>
        <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
        <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Species:</strong> ${pokemon.species.name}</p>
    `;
}

function displayError(error) {
    const displayDiv = document.getElementById('pokemonInfo');
    displayDiv.textContent = error.message;
}