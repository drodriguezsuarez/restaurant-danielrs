import {} from 'dotenv/config.js'
import { server } from './models/server.js'

const Server = new server();

Server.listen()