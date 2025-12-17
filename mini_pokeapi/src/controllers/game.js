const { request, response } = require('express');
const pool = require('../config/dbconection');
const { gameQuery } = require('../models/game');
const { users } = require('../models/user');

const win = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).send("Esto no es un numero");
        return;
    }



    let conn;
    try {
        conn = await pool.getConnection();
        const [user] = await conn.query(users.view, [id]);

        if (!user) {
            res.status(500).send("No se pudo registrar la victoria");
            return;
        }
        const [game] = await conn.query(gameQuery.getGame, [id]);

        if (!game) {
            const newGame = await conn.query(gameQuery.addGame, [id, 1, 0]);
            if (newGame.affectedRows === 0) {
                res.status(500).send("No se pudo registrar la victoria");
                return;
            }
            res.send({ msg: "registro del juego creado" });
            return;
        }

        const gameUpdated = await conn.query(gameQuery.updateGame, [game.win + 1, game.lose, id]);
        if (gameUpdated.affectedRows === 0) {
            res.status(500).send("No se pudo actualizar la victoria");
            return;
        }
        res.send({ msg: "Victoria registrada", game });
    } catch (err) {
        res.status(500).send("error");
    } finally {
        if (conn) conn.end();
    }
}

const lose = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).send("Esto no es un numero");
        return;
    }



    let conn;
    try {
        conn = await pool.getConnection();
        const [user] = await conn.query(users.view, [id]);

        if (!user) {
            res.status(404).send("Usuario no encontrado")
            return;
        }
        const [game] = await conn.query(gameQuery.getGame, [id]);

        if (!game) {
            const newGame = await conn.query(gameQuery.addGame, [id, 0, 1]);
            if (newGame.affectedRows === 0) {
                res.status(500).send("No se pudo registrar");
                return;
            }
            res.send({ msg: "registro del juego creado" });
            return;
        }

        const gameUpdated = await conn.query(gameQuery.updateGame, [game.win, game.lose + 1, id]);
        if (gameUpdated.affectedRows === 0) {
            res.status(500).send("No se pudo actualizar el juego");
            return;
        }
        res.send({ msg: "Juego registrada", game });

    } catch (err) {
        res.status(500).send("error");
    } finally {
        if (conn) conn.end();
    }
}




module.exports = {
    win,
    lose
};