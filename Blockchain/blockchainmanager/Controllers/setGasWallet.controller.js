'use strict';
var web3 = require('../config/dev-env');

exports.setGasToWallet =  (req, res) => {
    //The id to response the request
    var valueGas = 450000;
    var balance1 = 0;
    var balance2 = 0;
    let response = {
        "setGasToWallet": {
            "responseHeader": {
                "responseInfo": {
                    "system": "blockchainmanager",
                    "messageId": req.body.requestHeader.requestInfo.messageId,
                    "responseDate": new Date().toISOString()
                },
                "status": {
                    "code": "00",
                    "description": "Success"
                }
            },
            "responsePayload": {
                "hash": ""
            }
        }
    }
    try {
        web3.CON.eth.personal.unlockAccount(req.body.requestPayload.serverAddress, req.body.requestPayload.password).then(() => {
            web3.CON.eth.getBalance(req.body.requestPayload.serverAddress).then(resolve => {
                if (resolve) {
                    balance1 = resolve;
                }
            }).then(() => {
                web3.CON.eth.sendTransaction({
                    from: req.body.requestPayload.serverAddress,
                    to: req.body.requestPayload.clientAddress,
                    value: valueGas
                }).on('transactionHash', hash => {
                    if (balance1 != balance2) {
                        response.setGasToWallet.responseHeader.status.code = "200";
                        response.setGasToWallet.responseHeader.status.description = "Success";
                        response.setGasToWallet.responsePayload.hash = hash;
                        res.status(200).json(response)
                    }
                    else {
                        response.setGasToWallet.responseHeader.status.code = "603";
                        response.setGasToWallet.responseHeader.status.description = "Cannot set Gas to that wallet";
                        response.setGasToWallet.responsePayload.hash = hash;
                        res.status(204).json(response)
                    }
                }).then(() => {
                    web3.CON.eth.getBalance(req.body.requestPayload.serverAddress).then(resolve => {
                        if (resolve) { balance2 = resolve; }
                    })
                }).catch(err => {
                    response.setGasToWallet.responseHeader.status.code = "601";
                    response.setGasToWallet.responseHeader.status.description = err;
                    res.status(204).json(response)
                })
            }).catch(error => {
                //If the address of the user is wrong
                response.setGasToWallet.responseHeader.status.code = "600";
                response.setGasToWallet.responseHeader.status.description = String(error.message);
                res.status(600).json(response)
            })
        }).catch(error => {
            //The password is wrong
            response.setGasToWallet.responseHeader.status.code = "601";
            response.setGasToWallet.responseHeader.status.description = String(error.message) + "The password or the address is wrong";
            res.status(601).json(response)
        });
    }
    catch (e) {
        response.setGasToWallet.responseHeader.status.code = "602";
        response.setGasToWallet.responseHeader.status.description = "Cannot set Gas to that wallet: " + e;
        res.status(601).json(response)
    }

}