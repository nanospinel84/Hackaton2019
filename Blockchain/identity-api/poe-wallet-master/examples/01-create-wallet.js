/*
    * 01 - Create wallet
    * Node.js example on how to create a manster wallet with
    * it's seed words and retrieve it's propierties
*/
console.log(':: 01 - Create wallet ::')
console.log(':: Node.js example on how to create a manster wallet with ::')
console.log(':: it\'s seed words and retrieve it\'s propierties ::')

// Let's import our main file
const poeWallet = require('../index.js')

// We assign each lib to a single var
const walletUtils = poeWallet.util
const Wallet = poeWallet.Wallet

// First we will create the mnemonic.
// Be sure to write down this words, all the wallets we work with from here on
// will be savely derived from these words. CAUTION!

let mnemonic = walletUtils.createMnemonic()
console.log('Mnemonic:', mnemonic)
// "bike spoon convince green sister call bind estate dream topple drastic green"

// We will now initiate a wallet using the mnemonic we just created
let masterWallet = new Wallet(mnemonic)

// We can check for it's address, public key and private key
// Never share your private key!!

console.log('private key:', masterWallet.privateKey('string'))
console.log('public key:', masterWallet.publicKey('string'))
console.log('address', masterWallet.address('string'))
