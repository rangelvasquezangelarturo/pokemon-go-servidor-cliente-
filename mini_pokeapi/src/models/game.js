const gameQuery = {
    getGame: 'SELECT * FROM games WHERE user_id = ?',
    addGame: 'INSERT INTO games (user_id, win, lose) VALUES (?, ?, ?)',
    updateGame: 'UPDATE games SET win = ?, lose = ? WHERE user_id = ?'
}

module.exports = {
    gameQuery
};
