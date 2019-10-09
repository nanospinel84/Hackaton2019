/*
    * 06 - Comparing V3 vs AES-CTR self-descriptive string
    * Let's create a wallet under a namespace
*/

console.log(':: 06 - Comparing V3 vs AES-CTR wallet storage ::')
console.log(':: Using self-descriptive string of format ALG,SALT,ENCRYPTED ::')

// Let's import our main file
const poeWallet = require('../index.js')

// We assign each lib to a single var
const walletUtils = poeWallet.util
const Wallet = poeWallet.Wallet

// We generate a new unique mnemonic and masterWallet for this example.
let mnemonic = walletUtils.createMnemonic()
let masterWallet = new Wallet(mnemonic)
masterWallet.on('ready', (instance) => {
  console.log('masterWallet is ready')
})
// SDEK, Self Descriptive Encrypted Keypair
let pwd = 'q1w2e3r4'

let tbg = Date.now()

let v3String = masterWallet.toV3String(pwd)
console.log('v3String', v3String)
let v3Wallet = new Wallet(v3String, pwd)

v3Wallet.on('ready', (instance) => {
  console.log('V3 export & import took', Date.now() - tbg, '(ms)')
  console.log('Did wallet persist?', v3Wallet.address('string') === masterWallet.address('string'))
})
