// Estructura basica de la aplicación
const express = require('express');
const cors = require('cors');

const env = require('./config/environment');

class App {
    constructor() {
        this.app = express();
        this.port = env.port;
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        //ejecutar npm install cors
        this.app.use(express.json());

    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor esta ejecutando en el puerto ${this.port}`);
        });
    }

    routes() {
        //Para que resonponda localhoost:3000
        this.app.get('/', (req, res) => {
            res.send('Hola Mundo!');
        });
        //Para que responda localhoost:3000/user/
        this.app.use('/user', require('./routes/user'));
        //Para que responda localhoost:3000/pokemon/
        this.app.use('/pokemon', require('./routes/pokemon'));
        //Para que responda localhoost:3000/game/
        this.app.use('/game', require('./routes/game'));
    }
//ANGEL ARTURO RANGEL VASQUEZ 
}
module.exports = App;  