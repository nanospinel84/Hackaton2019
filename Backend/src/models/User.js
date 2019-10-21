import mongo from 'mongoose';

//constante de la basede datos
const Schema = mongo.Schema;

///Para costructor el dato { id: 123, nombre: testla}
const UserSchema = new Schema({
    name: String,
    email: String,
    cedula: String,
    registradoPor: String,
    hash: String,
    description: String,
    data: String
});

//para exportar el modelo en la variable User
const User = mongo.model('users', UserSchema);

export default User;

