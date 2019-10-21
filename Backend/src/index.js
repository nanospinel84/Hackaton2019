import express from 'express';
const app = express();


////Conexcion on base de datos mongo
import mongo from 'mongoose';
mongo.connect('mongodb://localhost/mongograph')
.then(() => console.log('mongodb conectado'))
.catch(err => console.log(err));

import Server from './Schema';




Server.applyMiddleware({
    app
  });



///Servidor escuchando en el puerto 3000
app.set('port', process.env.PORT || 3000);




// start the server
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
  });