import { Router } from "express";
import clienteControllers from "../controllers/cliente.js";

const router = Router();

router.get('/', clienteControllers.clienteGet);
router.get('/:id', clienteControllers.clienteGetById);
router.post('/', clienteControllers.clientePost);
router.put('/:id', clienteControllers.clientePut);
router.delete('/:id', clienteControllers.clienteDelete);

export default router;