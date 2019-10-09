var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var gasWalletRouter = require('./routes/setGasWallet');
var saveBlockchainRouter = require('./routes/saveBlockchainData');
var validateTxRouter = require('./routes/validateTx');
var healthRouter = require('./routes/healthRouter');
var infoRouter = require('./routes/infoRouter');
var envc=require('./config/dev-env');
var conf= require('./config/config');
//var config= require('./config/getconfig');
var connection=require('./config/connection')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(gasWalletRouter);
app.use(validateTxRouter);
app.use(saveBlockchainRouter);
app.use('/health',healthRouter);
app.use('/info',infoRouter);

// Register Services
var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/*+json' }));
envc.HOST = 'localhost';
envc.PORT = '7010';
envc.HTTP_PROVIDER= 'http://172.17.0.2:8540';
envc.CON= conf.web3(envc);

/*
data: {
    envc.HOST= '172.16.0.14';
    envc.PORT= '7010';
    envc.HTTP_PROVIDER= 'http://172.17.0.2:8540';
    envc.CON=conf.web3(envc);
    /** 
    envc.DATABASE.HOST=data.get('DB_HOST');
    envc.DATABASE.USER=data.get('DB_USER');
    envc.DATABASE.PORT=data.get('DB_PORT');
    envc.DATABASE.PASSWORD=data.get('DB_PASSWORD');
    envc.DATABASE.NAME=data.get('DB_DATABASE_NAME');
    envc.DATABASE.CONNECTION_LIMIT=data.get('DB_CONNECTIONLIMIT');
    envc.CONNECTION=connection.mysqlconnectionC(envc);
  }*/

app.use(bodyParser.json());
module.exports = app;
