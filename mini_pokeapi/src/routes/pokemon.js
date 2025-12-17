const { Router } = require('express');

const router = Router();

// Controladores

router.get('/seed', require('../controllers/pokemon').pokemonSeeder);
router.get('/random', require('../controllers/pokemon').randomPokemon);


module.exports = router;