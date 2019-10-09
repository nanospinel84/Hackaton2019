var express = require('express');
var router = express.Router();
var saveBlockchainData = require('../Controllers/saveBlockchainData.controller');

router.post('/services/security/1.0.0/walletManager/saveBlockchainData/', saveBlockchainData.saveBlockchainInfo);

module.exports = router;
