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

    try
    {
        const id = req.params.id;
        const uid = req.uid;
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        };
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error)
    {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se ha podido actualizar el médico.'
        });
    }
};

const eliminarMedico = async (req, res = response) =>
{

    try
    {
        const id = req.params.id;
        const medicoBorrado = await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            medico: medicoBorrado,
            msg: 'Medico borrado correctamente'
        });
    } catch (error)
    {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se ha podido eliminar el médico.'
        });
    }
};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
};