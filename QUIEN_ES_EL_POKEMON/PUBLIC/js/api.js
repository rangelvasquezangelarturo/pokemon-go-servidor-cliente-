const getPokemon = async () => {
    const res = await fetch('http://localhost:3000/pokemon/random');
    const data = await res.json();
    return data;
}


window.getPokeData = async () => {
    const pokemon = await getPokemon();

    const randomIndex = Math.floor(Math.random() * pokemon.length);


    const correctAnswer = pokemon[randomIndex];

    //const correctAnswer = pokemon.find(p => p.isCorrect);


    return {
        pokemonChoices: pokemon,
        correctAnswer,
    }
    //console.log(pokemon);
}

