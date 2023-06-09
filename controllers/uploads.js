const path = require('path');
const {response} = require("express");
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const {actualizarImagen} = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) =>
{
    const tipo = req.params.tipo;
    const id = req.params.id;

    console.log(tipo);

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo))
    {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, hospital o usuario.'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0)
    {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la imagen...

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    console.log(file);

    // Validar extension

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValidas.includes(extensionArchivo))
    {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión válida'
        });
    }

    //  Generar el nombre del archivo

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;


    // Mover la imagen
    file.mv(path, (err) =>
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                msg: 'Contacte con el administrador'
            });
        }

        // Actualizar base de datos

        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });



};

const mostrarImagen = (req, res = response) =>
{
    const {tipo, foto} = req.params;
    let pathImg;

    // Imagen por defecto

    if (fs.existsSync(pathImg))
    {
        pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    }
    else
    {
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }
    res.sendFile(pathImg);


};

module.exports = {
    fileUpload,
    mostrarImagen
};