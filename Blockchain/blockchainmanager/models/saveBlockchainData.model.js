'use strict';
var db = require('../config/dev-env');

exports.saveBlockchainData = function (ProtectedValue, documentNumber, attributeType, callback) {
    return db.CONNECTION.query(
        "Insert into ClientPrivateAttribute(ProtectedValue,Fk_ClientPrivateAttributes_Client,Fk_ClientPrivateAttributes_AttributeType,CreationDate,UserCreation) VALUES (?,(SELECT Id_Client from Client where DocumentNumber=?),?,now(),'IDC.DBU-DEV_SYS1');",
        [
            ProtectedValue,
            documentNumber,
            attributeType
        ],
        callback
    );
}