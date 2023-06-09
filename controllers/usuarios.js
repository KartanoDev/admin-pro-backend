const {response} = require('express');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require("../helpers/jwt");

const Usuario = require('../models/usuario');


const getUsuarios = async (req, res) =>
{

    const desde = Number(req.query.desde) || 0;

    // const usuarios = await Usuario
    //     .find({}, 'nombre email role google')
    //     .skip(desde)
    //     .limit(5);

    // const total = await Usuario.count();

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()
    ]
    );


    res.json({
        ok: true,
        usuarios,
        total
    });
};

const crearUsuario = async (req, res = response) =>
{
    const {email, password, nombre} = req.body;

    try
    {
        const existeEmail = await Usuario.findOne({email});
        if (existeEmail)
        {
            return res.status(400).json({
                ok: false,
                msg: `El correo ${email} ya existe.`
            });
        }
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        const token = await generarJWT(usuario.id);

        await usuario.save();

        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inisperado, revisar logs.'
        });
    }
};
const actualizarUsuario = async (req, res = response) =>
//TODO: Validar token y comprobar si es el usuario correcto
{
    const uid = req.params.id;


    try
    {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB)
        {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        const {password, google, email, ...campos} = req.body;

        if (usuarioDB.email !== email)
        {
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail)
            {
                return res.status(400).json({
                    ok: false,
                    error: 'Ese email pertenece a otro usuario'
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        await usuarioActualizado.save();

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error)
    {
        res.status(500).json({
            ok: false,
            error
        });
    }

};

const eliminarUsuario = async (req, res = response) =>
{
    const uid = req.params.id;


    try
    {
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });

    } catch (error)
    {
        res.status(500).json({
            ok: false,
            error
        });
    }

};

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};