import { Router } from 'express';
import platoControllers from '../controllers/plato.js';

const router = Router();

router.get('/', platoControllers.platoGet);
router.get('/:id', platoControllers.platoGetById);
router.post('/', platoControllers.platoPost);
router.put('/:id', platoControllers.platoPut);
router.put('/activar/:id', platoControllers.platoPutActive);
router.put('/desactivar/:id', platoControllers.platoPutDisable);
router.delete('/:id', platoControllers.platoDelete);

export default router;