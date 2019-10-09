const poeWallet = require('./poe-wallet-master')

const rpc = new poeWallet.RPC('http://172.16.0.10:8540')

let account

exports.sign=function (from, data, nonce, gas, password){
return new Promise(function(resolve,reject) {
let rawTx = {
  "from": from,
  "data": data,
  "nonce": nonce,
  "gas": gas
}
var sign;
rpc.personal.listAccounts()
.then(accounts => {
  account = accounts[0]
  rawTx['from'] = account
  console.log('from', account)
  return rpc.eth.getTransactionCount(account)
})
.then(nonce => {
  rawTx['nonce'] = nonce
  console.log('nonce', nonce)

  return rpc.eth.estimateGas(rawTx)
})
.then(gas => {
  console.log('gas', gas)
  rawTx['gas'] = gas
  return rpc.personal.signTransaction(rawTx, password)
})
.then(signed => {
  console.log('signed', signed.raw)
  sign=signed.raw
  /**return**/ resolve(sign);
})
.catch(function(e){
  console.error;
  reject(e);
});
});
}

