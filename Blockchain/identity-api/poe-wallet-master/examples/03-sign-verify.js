/*
    * 03 - Sign and verify
    * Let's sign some messages to prove that we own the signer wallet
*/

console.log(':: 03 - Sign and verify ::')
console.log(':: Let\'s sign some messages to prove that we own the signer wallet ::')

// Let's import our main file
const poeWallet = require('../index.js')

// We assign each lib to a single var
const walletUtils = poeWallet.util
const Wallet = poeWallet.Wallet

// Let's suppose we want a chat-like app
// We could assign each contact a subwallet to authenticate
// against each other

let alice = new Wallet(walletUtils.createMnemonic())
let aliceToBob = alice.getWallets('messaging/bob', 1)[0]

let bob = new Wallet(walletUtils.createMnemonic())
let bobToAlice = bob.getWallets('messaging/alice', 1)[0]

// When Alice and Bob have to communicate they will do using these wallets

let aliceMessage = 'hello bob!'
let aliceSigned = aliceToBob.sign(aliceMessage)

let bobMessage = 'hey there alice'
let bobSigned = bobToAlice.sign(bobMessage)

console.log('aliceToBob\'s signed message:', aliceSigned)
// Alice's signed message: 0x711df71c488af9f93730aa88961f0e6a506314cc538541713c699bb30d62702c0f21274c56d2a23ddbf13331118063a6d82e99a732932bef154124bdd5dcf59001
let didAliceSign = walletUtils.verifySignature(aliceSigned, aliceToBob.address('string'), aliceMessage)

console.log('Did aliceToBob sign the message?', didAliceSign)
// Did alice sign the message? true

let didBobSign = walletUtils.verifySignature(bobSigned, bobToAlice.address('string'), bobMessage)

console.log('bobToAlice\'s signed message:', bobSigned)
console.log('Did bobToAlice sign the message:', didBobSign)
