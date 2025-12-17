const { Router } = require('express');
const router = Router();
// Controladores

router.get('/win/:id', require('../controllers/game').win);
router.get('/lose/:id', require('../controllers/game').lose);
// router.get('/:id', require('../controllers/game').view);


module.exports = router;