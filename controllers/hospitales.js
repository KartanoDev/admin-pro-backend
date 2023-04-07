const {response} = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) =>
{
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');
    res.json({
        ok: true,
        hospitales
    });
};

const crearHospital = async (req, res = response) =>
{
    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try
    {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error)
    {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el hospital'
        });
    }



};

const actualizarHospital = async (req, res = response) =>
{
    try
    {
        const id = req.params.id;
        const uid = req.uid;
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error)
    {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se ha podido actualizar el hospital'
        });
    }


};

const eliminarHospital = async (req, res = response) =>
{
    const id = req.params.id;
    const hospital = await Hospital.findByIdAndDelete(id);

    try
    {
        if (!hospital)
        {
            res.status(500).json({
                ok: false,
                msg: 'Hospital no localizado por id'
            });
        }
        else
        {
            const id = req.params.id;
            const hospital = await Hospital.findByIdAndDelete(id);
            res.json({
                ok: true,
                hospital,
                msg: 'Hospital eliminado.'
            });
        }
    } catch (error)
    {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se ha podido eliminar el hospital'
        });
    }


};


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
};