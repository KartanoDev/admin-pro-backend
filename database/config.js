const mongoose = require('mongoose');

//const conPath = 'mongodb+srv://kartano:Amparo69.@angularavanzado.cushtb1.mongodb.net/test'
const dbConnection = async (conPath) =>
{
    try
    {
        await mongoose.connect(conPath, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Online')
    }
    catch (err)
    {
        console.log(err);
        throw new Error('Error miau: ', err)
    }
}

module.exports = {
    dbConnection
}