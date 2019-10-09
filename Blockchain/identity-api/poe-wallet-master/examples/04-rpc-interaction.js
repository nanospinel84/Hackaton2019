/*
    * 04 - RPC interacion
    * Demonstration on how to create and unlock
    * an account on an external Ethereum node
*/

console.log(':: 04 - RPC interacion ::')
console.log(':: Demonstration on how to create and unlock ::')
console.log(':: an account on an external Ethereum node ::')

// Let's import our main file
const poeWallet = require('../index.js')

// We assign each lib to a single var
const rpc = new poeWallet.RPC('http://localhost:8545')

// HTTP where node listens for API
let superSecretPassword = '1234567890'

rpc.personal.newAccount(superSecretPassword)
  .then(createdAddress => {
    console.log('Created address:', createdAddress)

    return rpc.personal.unlockAccount(
      createdAddress,
      superSecretPassword,
      null
    )
  })
  .then(isUnlocked => {
    console.log('Is it unlocked?', isUnlocked)
  })
  .catch(console.error)
