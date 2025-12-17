const pokemonQuery = {
    add: 'INSERT INTO pokemons (name, image) VALUES (?, ?)',
    random: 'SELECT * FROM pokemons ORDER BY RAND() LIMIT 4',
    view: 'SELECT * FROM pokemons WHERE id = ?'
}


module.exports = {
    pokemonQuery
};
