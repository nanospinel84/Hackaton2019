var express = require('express');
var router = express.Router();
var gasWalletController = require('../Controllers/setGasWallet.controller');


router.post('/services/security/1.0.0/walletManager/setGasWallet/', gasWalletController.setGasToWallet);

module.exports = router;
