import express from 'express'
import cors from 'cors';
import dbconnection from '../database/config.js';
import categoria from '../routes/categoria.js';
import usuario from '../routes/usuario.js';
import plato from '../routes/plato.js';
import cliente from '../routes/cliente.js';
import pedido from '../routes/pedido.js'

class server {
    constructor() {
        this.port = process.env.PORT;
        //  crear servidor
        this.app = express();
        // conectar la base de datos
        this.conectarBD();
        // middlewares
        this.middlewares();
        // Nuestras rutas
        this.routes();
    }
    routes() {
        this.app.use('/api/categoria', categoria)
        this.app.use('/api/usuario', usuario)
        this.app.use('/api/plato', plato)
        this.app.use('/api/ciente', cliente)
        this.app.use('/api/pedido', pedido)

    }
    async conectarBD() {
        await dbconnection();
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.static('public'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }

}

export { server }