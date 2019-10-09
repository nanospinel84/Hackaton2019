/*
    * 02 - Derive wallets
    * Let's create a wallet under a namespace
*/

console.log(':: 02 - Derive wallets ::')
console.log(':: Let\'s create a wallet under a namespace ::')

// Let's import our main file
const poeWallet = require('../index.js')

// We assign each lib to a single var
const walletUtils = poeWallet.util
const Wallet = poeWallet.Wallet

// We generate a new unique mnemonic and masterWallet for this example.
let mnemonic = walletUtils.createMnemonic()
let masterWallet = new Wallet(mnemonic)

// Now we will use namespaces to generate purpose-oriented wallets
// Let's say we want 5 wallets to interact with ERC20 tokens
let namespaceERC20 = 'ERC20'

let walletsERC20 = masterWallet.getWallets(namespaceERC20, 5)

walletsERC20.forEach((wallet, i) => {
  console.log(
    'Address:', wallet.address('string'),
    'Count:', i,
    'Namespace:', namespaceERC20
  )
})

// Address: 0xbb27c0484977c6246f67ae6108aff8b4cb26d268 Count: 0 Namespace: ERC20
// Address: 0x22205839a6255f898629b1091d87b828229b2447 Count: 1 Namespace: ERC20
// Address: 0xf154781819ff7d5df6fd3f0a7d62705ce97f135e Count: 2 Namespace: ERC20
// Address: 0x590914b918cbd8e0d57ddfb78b4b51cbda79549c Count: 3 Namespace: ERC20
// Address: 0x7302fd5b7b4fc09b02cd80a5cb3f95e43e7754cc Count: 4 Namespace: ERC20

// Now we can operate with each generated wallet as we do with the master one,
// we can even generate sub-namespaces if needed

let gamesWallet = masterWallet.getWallets('games', 1)[0]
let cryptoKittiesWallet = gamesWallet.getWallets('kitties', 1)[0]

console.log('Games wallet:', gamesWallet.address('string'))
console.log('Crypto kitties wallet:', cryptoKittiesWallet.address('string'))
