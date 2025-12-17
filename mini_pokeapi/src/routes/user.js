//Rutas de los Endpoints
const { Router } = require('express');
const router = Router();
router.get('/', require('../controllers/user').showUsers);
router.get('/:id',require('../controllers/user').viewUser);
router.post('/',require('../controllers/user').createUser);
router.delete('/:id',require('../controllers/user').removeUser);
router.put('/:id',require('../controllers/user').updateUser);
router.post('/login',require('../controllers/user').loginUser);
module.exports = router;
