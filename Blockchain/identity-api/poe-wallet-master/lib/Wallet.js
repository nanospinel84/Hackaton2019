
// third party libs
const bip39 = require('bip39')
const HDKey = require('hdkey')
const Base64 = require('js-base64').Base64
const randomBytes = require('random-bytes')
const pbkdf2 = require('pbkdf2')
const crypto = require('crypto')
const uuidv4 = require('uuid/v4')
const sha3 = require('js-sha3').sha3_256
const walletUtils = require('./util.js')
const EventEmitter = require('events').EventEmitter
const util = require('util')

class Wallet {
  /**
   * Retrieve private key once wallet is initialized.
   * @param {string} mnemonicSeed - Mnemonic Seed.
   */
  constructor (mnemonicSeed, v3Password) {
    this.shake256Length = 32

    if (mnemonicSeed && v3Password) {
      this.fromV3(mnemonicSeed, v3Password)
    } else if (mnemonicSeed) {
      this.fromMnemonic(mnemonicSeed)
    }
  }

  /**
   * Retrieve private key once wallet is initialized.
   * @param {string} format - Formatting : can be buffer or string.
   * @returns {string} - private key for the given wallet instance.
   */

  privateKey (format = 'buffer') {
    if (!this.instance) {
      throw new Error('Wallet not initialized, cannot retrieve private key')
    }

    let privateKey = this.instance._privateKey
    return (format === 'string') ? walletUtils.addHexPrefix(privateKey.toString('hex')) : privateKey
  }

  /**
   * Retrieve public key once wallet is initialized.
   * @param {string} format - Formatting : can be buffer or string.
   * @returns {string} - Public key for the given wallet instance.
   */
  publicKey (format = 'buffer') {
    if (!this.instance) {
      throw new Error('Wallet not initialized, cannot retrieve public key')
    }

    let publicKey = this.instance._publicKey
    return (format === 'string') ? walletUtils.addHexPrefix(publicKey.toString('hex')) : publicKey
  }

  /**
   * Retrieve address once wallet is initialized.
   * @param {string} format - Formatting : can be buffer or string.
   * @returns {string} - Address for the given wallet instance.
   */

  address (format = 'buffer') {
    if (!this.instance) {
      throw new Error('Wallet not initialized, cannot retrieve address')
    }

    let publicKeyBuffer = this.instance._publicKey
    let address = walletUtils.pubToAddress(publicKeyBuffer)

    return (format === 'string') ? walletUtils.addHexPrefix(address.toString('hex')) : address
  }

  /**
   * Initializes privKey, pubKey and address from mnemonic.
   * @param {string} mnemonicSeed - Mnemonic.
   */
  fromMnemonic (mnemonicSeed) {
    let self = this
    if (!bip39.validateMnemonic(mnemonicSeed)) {
      throw new Error('Invalid mnemonic provided to Wallet.fromMnemonic :' + mnemonicSeed)
    }

    delete this.mnemonicSeed
    delete this.instance

    this.mnemonicSeed = mnemonicSeed
    this.instance = HDKey.fromMasterSeed(mnemonicSeed)

    // deferred so wallet.on('ready') works for mnemonics as well
    setTimeout(() => { self.emit('ready', this) }, 0)
  }

  /**
   * Initializes the current wallet with the given hdkey
   * @param {string} masterMnemonicSeed - Mnemonic.
   */
  fromHDKey (hdkey) {
    delete this.mnemonicSeed
    delete this.instance
    this.instance = hdkey
  }

  /**
   * Generates `addressCount` accounts on provided `namespace`
   * @param {string} namespace - Namespace for generation.
   * @param {number} addressCount - How many addresses are to be generated.
   * @returns {Array} - Wallets
   */
  getWallets (namespace, addressCount) {
    let wallets = []

    for (var i = 0; i < addressCount; i++) {
      let idx = walletUtils.namespaceToNumber(namespace, i, this.shake256Length)
      let child = this.instance.deriveChild(idx)
      let wallet = new Wallet()
      wallet.fromHDKey(child)
      wallets.push(wallet)
    }
    return wallets
  }

  /**
   * Generates `addressCount` accounts on provided `namespace`
   * @param {string} namespace - Namespace for generation.
   * @param {number} addressCount - How many addresses are to be generated.
   * @returns {Array} - Addresses
   */
  getAddresses (namespace, addressCount) {
    let wallets = this.getWallets(namespace, addressCount)
    let addresses = []

    wallets.forEach(wallet => {
      addresses.push(walletUtils.addHexPrefix(wallet.address('string')))
    })

    return addresses
  }

  /**
   * Signs a given message with the current wallet
   * @param {string} messageStr - Message to sign
   * @returns {string} - Base64 encoded json object with hash and signature
   */
  sign (messageStr) {
    let hash = walletUtils.hashPersonalMessage(Buffer.from(messageStr))
    let signed = walletUtils.ecsign(hash, this.privateKey())

    let json = JSON.stringify({
      v: signed.v,
      r: signed.r.toString('hex'),
      s: signed.s.toString('hex'),
      hash: hash.toString('hex')
    })

    return Base64.encode(json)
  }

  /**
   * Exports the instance of the wallet to a V3 object
   * @param {string} password - To protect the file
   * @returns {object} - V3 Object
   */
  toV3 (password) {
    let salt = randomBytes.sync(32)
    let iv = randomBytes.sync(16)
    let kdf = 'pbkdf2'

    let kdfparams = {
      dklen: 32,
      salt: salt.toString('hex'),
      c: 1048576,
      prf: 'hmac-sha256'
    }

    let derivedKey = pbkdf2.pbkdf2Sync(
      Buffer.from(password),
      salt,
      kdfparams.c,
      kdfparams.dklen,
      'sha256'
    )

    let cipher = crypto.createCipheriv(
      'aes-128-ctr',
      derivedKey.slice(0, 16),
      iv
    )

    let ciphertext = Buffer.concat([
      cipher.update(this.privateKey()),
      cipher.final()
    ])

    let mac = sha3(
      Buffer.concat([
        derivedKey.slice(16, 32),
        Buffer.from(ciphertext, 'hex')
      ])
    )

    return {
      version: 3,
      id: uuidv4(),
      address: this.address('string'),
      Crypto: {
        ciphertext: ciphertext.toString('hex'),
        cipherparams: {
          iv: iv.toString('hex')
        },
        cipher: 'aes-128-ctr',
        kdf: kdf,
        kdfparams: kdfparams,
        mac: mac.toString('hex')
      }
    }
  }

  /**
  * Exports the current wallet to a V3 string
  * @param {string} password - To encrypt the export
  * @returns {string} - JSON-encoded V3 wallet
  */
  toV3String (password) {
    return JSON.stringify(this.toV3(password))
  }

  /**
   * Imports a wallet from it's V3 expression
   * @param {string} input - JSON-encoded V3 wallet
   * @param {string} password - To encrypt the export
   * @returns {Wallet} - New instance using the wallet
   */
  fromV3 (input, password) {
    let self = this
    let json = JSON.parse(input)
    let kdfparams = json.Crypto.kdfparams

    let derivedKey = pbkdf2.pbkdf2Sync(
      Buffer.from(password),
      Buffer.from(kdfparams.salt, 'hex'),
      kdfparams.c,
      kdfparams.dklen,
      'sha256'
    )
    var ciphertext = Buffer.from(json.Crypto.ciphertext, 'hex')

    var decipher = crypto.createDecipheriv(json.Crypto.cipher, derivedKey.slice(0, 16), Buffer.from(json.Crypto.cipherparams.iv, 'hex'))
    var seed = Buffer.concat([ decipher.update(ciphertext), decipher.final() ]).toString('hex')

    if (this.mnemonicSeed) {
      delete this.mnemonicSeed
    }

    if (!this.instance) {
      let hardcodedSeed = 'a0c42a9c3ac6abf2ba6a9946ae83af18f51bf1c9fa7dacc4c92513cc4dd015834341c775dcd4c0fac73547c5662d81a9e9361a0aac604a73a321bd9103bce8af'
      this.instance = HDKey.fromMasterSeed(Buffer.from(hardcodedSeed, 'hex'))
    }

    this.instance.privateKey = Buffer.from(seed, 'hex')
    if (this.address('string') !== json.address) {
      throw new Error('Password did not work, please provide a valid one')
    }
    setTimeout(() => { self.emit('ready') }, 0)
    return this
  }
}

util.inherits(Wallet, EventEmitter)

module.exports = Wallet
