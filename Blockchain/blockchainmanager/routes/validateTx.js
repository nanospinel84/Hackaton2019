var express = require('express');
var router = express.Router();
var validateTxController = require('../Controllers/validateTx.controller');


router.post('/services/security/1.0.0/walletManager/validateTx/', validateTxController.validation);

module.exports = router;
