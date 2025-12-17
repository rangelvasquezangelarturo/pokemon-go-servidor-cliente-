const { request, response } = require('express');
const pokeapi = require('../api/pokeapi');
const pool = require('../config/dbconection');
const { pokemonQuery } = require('../models/pokemon');

const pokemonSeeder = async (req = request, res = response) => {
    const pokemons = await pokeapi.getPokemons();

    let conn;

    try {
        conn = await pool.getConnection();
        await conn.query('SET FOREIGN_KEY_CHECKS = 0');
        await conn.query('TRUNCATE TABLE pokemons');
        await conn.query('SET FOREIGN_KEY_CHECKS = 1');

        pokemons.forEach(async (pokemon) => {
            await conn.query(pokemonQuery.add, [pokemon.name, pokemon.image]);
        });
        res.send("Pokemones agregados en la Base de Datos");
    } catch (err) {
        return res.status(500).send(err);
    } finally {
        if (conn) {
            conn.end();
        }
    }

}

const randomPokemon = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const pokemons = await conn.query(pokemonQuery.random);
        if (pokemons.length === 0) {
            return res.status(500).send("No hay pokemones en la base de datos");
        }
        res.send(pokemons);

    } catch (err) {
        return res.status(500).send(err);
    } finally {
        if (conn) {
            conn.end();
        }
    }
}

const idPokemon = async (req = request, res = response) => {
    let conn;
    try {
        const { id } = req.params
        if (isNaN(Number(id))) {
            res.status(400).send("Esto no es un numero");
            return;
        }

        conn = await pool.getConnection();
        const pokeid = await conn.query(pokemonQuery.view, [id]);
        if (!pokeid) {
            res.status(404).send("Pokemon no encontrado");
            return;
        }
        res.send(pokeid);
    } catch (err) {
        return res.status(500).send(err);
    } finally {
        if (conn) {
            conn.end();
        }
    }
}

module.exports = {
    pokemonSeeder,
    randomPokemon,
    idPokemon
};
