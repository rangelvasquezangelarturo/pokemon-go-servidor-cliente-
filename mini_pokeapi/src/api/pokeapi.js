const getPokemons = async () => {
    //const pokemon = [];
    //let pokemons = [];
    // Link de imagen de pokemon en .svg


    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const { results } = await response.json();

    const pokemons = results.map((pokemon, index) => {
        return { ...pokemon, image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg` }
    });

    // for (let i = 1; i <= 151; i++) {
    //     // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    //     // const data = await response.json();

    //     const pokemon = {
    //         name: data.name,
    //         imagen: data.sprites.other.dream_world.front_default,
    //     }
    //pokemons.push(pokemon);
    //}


    return pokemons;

}

module.exports = {
    getPokemons
};