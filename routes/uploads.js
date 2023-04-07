/*
    Ruta: /api/uploads/
*/

const {Router} = require('express');

const expressFileUpload = require('express-fileupload');

const {validarJWT} = require('../middlewares/validar-jws');
const {fileUpload, mostrarImagen} = require('../controllers/uploads');


const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', [
    validarJWT
], fileUpload);

router.get('/:tipo/:foto', [
], mostrarImagen);



module.exports = router;