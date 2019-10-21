import mongo from 'mongoose';

//constante de la basede datos
const Schema = mongo.Schema;

///Para costructor el dato { id: 123, nombre: testla}
const CompanySchema = new Schema({
    name: String,
    email: String,
    password: String,
    hash: String,
    description: String,
    data: String
});

//para exportar el modelo en la variable User
const Company = mongo.model('companies', CompanySchema);

export default Company;

