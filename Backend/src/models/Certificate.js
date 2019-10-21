import mongo from 'mongoose';

//constante de la basede datos
const Schema = mongo.Schema;

///Para costructor el dato { id: 123, nombre: testla}
const CertificateSchema = new Schema({
    type: String,
    userId: String,
    medic: String,
    companyName: String,
    hash: String,
    hash: String,
    description: String,
    data: String
});

//para exportar el modelo en la variable User
const Certificate = mongo.model('certificate', CertificateSchema);

export default Certificate;

