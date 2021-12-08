import { Router } from 'express';
import categoriaControllers from '../controllers/categoria.js';
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeCategoriaById, existeCategoriaByNombre } from '../helpers/categorias.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import validarRoles from '../middlewares/validar-rol.js';

const router = Router();

router.get('/', [
    validarJWT,
    validarRoles('ADMIN_ROL', 'SELLER_ROL'),
    validarCampos
], categoriaControllers.categoriaGet);

router.get('/:id', [
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaGetById);

router.post('/', [
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
], categoriaControllers.categoriaPost);

router.put('/:id', [
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos, check('nombre').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre)
], categoriaControllers.categoriaPut);

router.put('/activar/:id', [
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaPutActive);

router.put('/desactivar/:id', [
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaPutDisable);

router.delete('/:id', [
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaDelete);

export default router;