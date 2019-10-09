var model = require('../models/saveBlockchainData.model');

exports.saveBlockchainInfo = function (req, res) {
    let response = {
        "saveBlockchainInfo": {
            "responseHeader": {
                "responseInfo": {
                    "system": "D07-TS-Walletmanager",
                    "messageId": req.body.requestHeader.requestInfo.messageId,
                    "responseDate": new Date().toISOString()
                },
                "status": {
                    "code": "00",
                    "description": "Success"
                }
            },
            "responsePayload": {
                "result": false
            }
        }
    }
    model.saveBlockchainData(JSON.stringify(req.body.requestPayload.protectedData), req.body.requestPayload.documentNumber, req.body.requestPayload.attributeType, function (err, data) {
        if (err) {
            switch (err.errno) {
                case 1045:
                    response.saveBlockchainInfo.responseHeader.status.code = "511";
                    response.saveBlockchainInfo.responseHeader.status.description = err.message;
                    response.saveBlockchainInfo.responsePayload.result = false;
                    res.status(511).json(response);
                    break;
                case 1142:
                    response.saveBlockchainInfo.responseHeader.status.code = "512";
                    response.saveBlockchainInfo.responseHeader.status.description = err.message;
                    response.saveBlockchainInfo.responsePayload.result = false;
                    res.status(512).json(response);
                    break;
                case 1044:
                    response.saveBlockchainInfo.responseHeader.status.code = "513";
                    response.saveBlockchainInfo.responseHeader.status.description = err.message;
                    response.saveBlockchainInfo.responsePayload.result = false;
                    res.status(513).json(response);
                    break;
                case 1452:
                    response.saveBlockchainInfo.responseHeader.status.code = "514";
                    response.saveBlockchainInfo.responseHeader.status.description = err.message;
                    response.saveBlockchainInfo.responsePayload.result = false;
                    res.status(514).json(response);
                    break;
                case 1062:
                    response.saveBlockchainInfo.responseHeader.status.code = "515";
                    response.saveBlockchainInfo.responseHeader.status.description = err.message;
                    response.saveBlockchainInfo.responsePayload.result = false;
                    res.status(515).json(response);

                    break;
                case "ECONNREFUSED":
                    response.saveBlockchainInfo.responseHeader.status.code = "510";
                    response.saveBlockchainInfo.responseHeader.status.description = err.message;
                    response.saveBlockchainInfo.responsePayload.result = false;
                    res.status(510).json(response);
                    break;
                default:
                    response.saveBlockchainInfo.responseHeader.status.code = "520";
                    response.saveBlockchainInfo.responseHeader.status.description = err.message;
                    response.saveBlockchainInfo.responsePayload.result = false;
                    res.status(520).json(response);
            }
        }
        else {
            response.saveBlockchainInfo.responseHeader.status.code = "200";
            response.saveBlockchainInfo.responseHeader.status.description = "Success";
            response.saveBlockchainInfo.responsePayload.result = true;
            res.status(200).json(response);
        }
    })
}

