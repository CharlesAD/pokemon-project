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
    displayDiv.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    `;
}

function displayError(error) {
    const displayDiv = document.getElementById('pokemonInfo');
    displayDiv.textContent = error.message;
}