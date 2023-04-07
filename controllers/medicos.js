const {response, json} = require("express");
const Medico = require("../models/medico");


const getMedicos = async (req, res = response) =>
{
    const medicos = await Medico.find()
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    });
};

const crearMedico = async (req, res = response) =>
{
    const uid = req.uid;

    try
    {
        const medicoDB = new Medico({
            usuario: uid,
            ...req.body
        });

        medicoDB.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error)
    {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con un administrador'
        });
    }


};

const actualizarMedico = async (req, res = response) =>
{

    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
};

const eliminarMedico = async (req, res = response) =>
{

    res.json({
        ok: true,
        msg: 'eliminarMedico'
    });
};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
};