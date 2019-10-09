const identity = require('./contracts/identity.json')
const express = require('express')
const Web3 = require('web3')
const poeWallet = require('./poe-wallet-master')
const sign = require('./sign')
const bodyParser = require('body-parser')
const web3 = require('./config/config')
let contract = new web3.eth.Contract(identity.abi)
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));

exports.signTransaction = function (req, res) {

}



const cleanOutputCall = (hex, outputs) => {
  let clean = hex.substring(2)
  clean = clean.match(/.{1,64}/g);
  let final = {}

  outputs.forEach((output, i) => {
    final[output.name] = clean[i]
  })

  return final
}


const cleanOutputSend = (result, outputs) => {
  let logs = result.logs[0].topics
  let final = {}

  outputs.forEach((output, i) => {
    final[output.name] = logs[i + 1].substring(2)
  })

  return final
}


identity.abi.forEach(item => {
  let responseId = Math.floor((Math.random() * 100000000) + 10000000);
  let isConstructor = (item.type === 'constructor' && item.name === undefined)
  let isMethod = (item.type === 'function' && item.name != undefined)

  if (isMethod || isConstructor) {
    console.log(item.name, item.type)
    let basePath = '/identity/:address/' + item.name + '/'
    if (isConstructor) {

      basePath = '/identity/signTransaction'
      app.put(basePath, (req, res) => {
        let tx = {
          from: req.body.from,
          data: identity.bytecode
        }
        console.log("this is from", req.body.password)
        web3.eth.getTransactionCount(req.body.from)
          .then(nonce => {
            tx['nonce'] = nonce
            return web3.eth.estimateGas(tx)
          })
          .then(gas => {
            tx['gas'] = '0x' + gas.toString(16)
            sign.sign(tx.from, tx.data, tx.nonce, tx.gas, req.body.password).then(data => {
              console.log("<<<DATA ENCONTRADA>>>", data);
              res.status(200).json({
                "responseSignTransaction": {
                  "responseHeader": {
                    "responseInfo": {
                      "id": 106 + responseId,
                      "responseDate": new Date().toISOString()
                    },
                    "status": {
                      "code": "200",
                      "description": "Success",
                      "transaction": tx,
                      "signed": data
                    }
                  }
                }
              })

            }).catch(function(e){
            res.status(406).json({
              "responseSignTransaction": {
                "responseHeader": {
                  "responseInfo": {
                    "id": 106 + responseId,
                    "responseDate": new Date().toISOString()
                  },
                  "status": {
                    "code": "406",
                    "description": "Error signing: "+ e
                  }
                }
              }
            })
          })

      })
    })
    } else {
      app.put(basePath, (req, res) => {
        let params = []
        // console.log('tx construction requested')

        if (item.inputs.length > 0) {
          item.inputs.forEach(input => {
            params.push(req.body[input.name.substring(1)])
          })
        }

        // console.log(req.body)
        // console.log(params)

        let packedData = web3.contract.methods[item.name].apply(this, params).encodeABI()
        if (item.constant) {
          let c = {
            from: req.body.from,
            to: req.body.address,
            data: packedData
          }

          web3.eth.call(c)
            .then(hexRes => {
              res.json({
                success: true,
                result: cleanOutputCall(hexRes, item.outputs)
              })
            })
        } else {
          let tx = {
            from: req.body.from,
            to: req.body.address,
            data: packedData
          }
          web3.eth.getTransactionCount(req.body.from)
            .then(nonce => {
              tx['nonce'] = nonce
              return web3.eth.estimateGas(tx)
            })
            .then(gas => {
              tx['gas'] = gas || 53000
              // console.log('server tx', tx)
              res.status(200).json({
                "responseSignTransaction": {
                  "responseHeader": {
                    "responseInfo": {
                      "id": 106 + responseId,
                      "responseDate": new Date().toISOString()
                    },
                    "status": {
                      "code": "200",
                      "description": "Signed: " + tx
                    }
                  }
                }
              });
            })
            .catch(e => {
              tx['gas'] = 50000
              res.status(406).json({
                "responseSignTransaction": {
                  "responseHeader": {
                    "responseInfo": {
                      "id": 106 + responseId,
                      "responseDate": new Date().toISOString()
                    },
                    "status": {
                      "code": "406",
                      "description": "Cannot sign transaction: " + tx
                    }
                  }
                }
              });
            })
        }
      })
    }
    //THIS IS THE POST WHERE WE CAN DEPLOY THE IDENTITY CONTRACT WITH THE SIGNED TRANSACTION ON THE PUT METHOD
    if (!item.constant) {
      basePath = '/identity/deployContract'
      app.post(basePath, (req, res) => {

        //	console.log(req.headers.signed);
        web3.eth.sendSignedTransaction(req.body.signed)
          .then(result => {
            if (isConstructor) {
              res.status(200).json({
                "responseDeployContract": {
                  "responseHeader": {
                    "responseInfo": {
                      "id": 106 + responseId,
                      "responseDate": new Date().toISOString()
                    },
                    "status": {
                      "code": "200",
                      "description": "Success: " + result
                    }
                  }
                }
              })
            } else {
              res.json({
                success: true,
                result: cleanOutputSend(result, item.outputs)
              })
            }

          })
          .catch(e => {
            // filter fweird error reporting
            try {
              let json = e.toString().split('more gas:')[1]
              res.status(403).json({
                "responseDeployContract": {
                  "responseHeader": {
                    "responseInfo": {
                      "id": 106 + responseId,
                      "responseDate": new Date().toISOString()
                    },
                    "status": {
                      "code": "403",
                      "description": "Error: " + JSON.parse(json).web3.contractAddress
                    }
                  }
                }
              })
            } catch (eee) {

              var resultError = e.toString();
              var answer = resultError.startsWith("Returned", 7);
              if (answer == true) {
                res.status(406).json({
                  "responseDeployContract": {
                    "responseHeader": {
                      "responseInfo": {
                        "id": 106 + responseId,
                        "responseDate": new Date().toISOString()
                      },
                      "status": {
                        "code": "406",
                        "description": "Cannot deploy contract: " + e
                      }
                    }
                  }
                });
              } else {
                var answerIfSuccess = resultError.startsWith("Transaction", 7);
                //var newValue= answerIfSuccess.replace()
                //  console.log("First json",JSON.stringify(e) );
                //  console.log("Second Json",JSON.parse(e.message));
                var string = e.toString();
                var string2 = string.substring(49, string.length);
                console.log("chan chan channn", string2)
                if (answerIfSuccess == true) {
                  res.status(200).json({
                    "responseDeployContract": {
                      "responseHeader": {
                        "responseInfo": {
                          "id": 106 + responseId,
                          "responseDate": new Date().toISOString()
                        },
                        "status": {
                          "code": "200",
                          "description": "Success",
                          "data": JSON.parse(string2)
                        }
                      }
                    }
                  })
                }

              }

            }
          })
      })
    }

    // // console.log('listening for', basePath)

  }
  if (item.type === 'event' && item.name != undefined) {
  }

})
app.listen(3000, () => {
  console.log('Identity API listening on port', 3000)
})

module.exports = app


