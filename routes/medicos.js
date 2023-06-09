/*
Ruta: /api/medicos
*/

const {Router} = require('express');
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jws');
const {getMedicos, crearMedico, actualizarMedico, eliminarMedico} = require('../controllers/medicos');

const router = Router();

router.get('/', getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombnre del médico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id tiene que ser válido').isMongoId(),
        validarCampos
    ],
    crearMedico);

router.put('/:id',
    [

    ],
    actualizarMedico);


router.delete('/:id',
    [

    ],
    eliminarMedico);

module.exports = router;