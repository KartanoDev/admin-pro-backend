require('dotenv').config();

const express = require('express');
const cors = require('cors');
const env = process.env;

const {dbConnection} = require('./database/config');
// Crear el servidor express
const app = express();

// Base de datos
dbConnection(env.DB_CNN);


// Lectura y parseo del body

app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/todo', require('./routes/busqueda'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));

// Configurar CORS
app.use(cors());

app.listen(env.PORT, () =>
{
    console.log('Servidor corriendo en el puerto ' + env.PORT);
});