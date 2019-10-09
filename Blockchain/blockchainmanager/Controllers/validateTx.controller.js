var web3 = require('../config/dev-env');

exports.validation = function (req, res) {

    let response = {
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
            }
    }

    try {
        web3.CON.eth.getTransactionReceipt(req.body.requestPayload.hash).then(tx=>{
            if (tx.blockNumber == undefined){
                response.responseHeader.status.code = "204";
                response.responseHeader.status.description = "Transaction receipt not found";
                res.status(204).json(response)
            } else {
                response.responseHeader.status.code = "200";
                response.responseHeader.status.description = "Tx it's correctly";
                res.status(200).json(response)
            }
        }, result =>{
            response.responseHeader.status.code = "400";
            response.responseHeader.status.description = "Cannot validate " + result;
            res.status(400).json(response)
        });
} catch (e) {
    response.responseHeader.status.code = "400";
    response.responseHeader.status.description = "Cannot validate " + e;
    res.status(400).json(response)
}
}
