const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = async (coleccion, nombreColeccion) =>
{
    const pathViejo = `./uploads/${nombreColeccion}/${coleccion.img}`;
    if (fs.existsSync(pathViejo))
    {
        // borrar la imagen anterior
        fs.unlinkSync(pathViejo);
    }
};


const actualizarImagen = async (tipo, id, nombreArchivo) =>
{
    switch (tipo)
    {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico)
            {
                console.log('No es un médico por id');
                return false;
            }
            await borrarImagen(medico, 'medicos');

            medico.img = nombreArchivo;

            await medico.save();
            return true;
            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital)
            {
                console.log('No es un hospital por id');
                return false;
            }
            await borrarImagen(hospital, 'hospitales');

            hospital.img = nombreArchivo;

            await hospital.save();
            return true;
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario)
            {
                console.log('No es un usuario por id');
                return false;
            }
            await borrarImagen(usuario, 'usuarios');

            usuario.img = nombreArchivo;

            await usuario.save();
            return true;
            break;

        default:
            break;
    }

};

module.exports = {
    actualizarImagen
};