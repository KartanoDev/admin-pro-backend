/*
    Ruta: /api/todo/
*/

const {Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jws');
const {getTodo, getDocumentosColeccion} = require('../controllers/busqueda');


const router = Router();

router.get('/:busqueda', [
    validarJWT
], getTodo);

router.get('/coleccion/:coleccion/:busqueda', [
    validarJWT
], getDocumentosColeccion);






module.exports = router;