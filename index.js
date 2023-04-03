require('dotenv').config();

const express = require('express');
const cors = require('cors')
const env = process.env;

const {dbConnection} = require('./database/config')
// Crear el servidor express
const app = express();

// Base de datos
dbConnection(env.DB_CNN);

// Configurar CORS
app.use(cors())

app.get('/', (req, res) =>
{
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

app.listen(env.PORT, () =>
{
    console.log('Servidor corriendo en el puerto ' + env.PORT)
})