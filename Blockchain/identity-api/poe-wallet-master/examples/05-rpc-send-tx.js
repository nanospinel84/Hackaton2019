/*
    * 05 - RPC send transaction
    * Sends an arbitrary transaction
*/

console.log(':: 05 - RPC send transaction ::')
console.log(':: Sends an arbitrary transaction ::')

// Let's import our main file
const poeWallet = require('../index.js')

// We assign each lib to a single var
const rpc = new poeWallet.RPC('http://localhost:8545')

rpc.eth.accounts()
  .then(accounts => {
    let address = accounts[0]

    return rpc.eth.sendTransaction({
      from: address,
      to: '0x000000000000000000000000000000000000cafe',
      gas: '0x76c0',
      gasPrice: '0x9184e72a000',
      value: '0x9184e72a',
      data: ''
    })
  })
  .then(txReceipt => {
    console.log('txReceipt', txReceipt)
  })
  .catch(console.error)
