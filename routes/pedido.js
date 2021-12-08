import { Router } from 'express'
import pedidoControllers from '../controllers/pedido.js'

const router = Router();
router.get('/', pedidoControllers.pedidoGet);
router.get('/:id', pedidoControllers.pedidoGetById);
router.put('/activate/:id', pedidoControllers.pedidoActivar);
router.put('/deactivate/:id', pedidoControllers.pedidoDesactivar);
router.post('/', pedidoControllers.pedidoPost);

export default router 