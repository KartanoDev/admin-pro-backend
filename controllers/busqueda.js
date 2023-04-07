const {response} = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");


const getTodo = async (req, res = response) =>
{
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospital] = await Promise.all(
        [
            Usuario.find({nombre: regex}),
            Medico.find({nombre: regex}),
            Hospital.find({nombre: regex})
        ]
    );

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospital
    });
};


const getDocumentosColeccion = async (req, res = response) =>
{
    const coleccion = req.params.coleccion;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    console.log(req.params);
    let data;
    switch (coleccion)
    {
        case 'medicos':
            data = await Medico.find({nombre: regex})
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({nombre: regex});
            break;

        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                .populate('usuario', 'nombre');
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: ' La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }

    res.json({
        ok: true,
        data
    });
};

module.exports = {
    getTodo,
    getDocumentosColeccion
};