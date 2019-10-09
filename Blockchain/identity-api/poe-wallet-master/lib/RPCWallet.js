const RPC = require('./RPC')
const EventEmitter = require('events').EventEmitter
const util = require('util')
const bip39 = require('bip39')

class RPCWallet {
  assign (api, method) {
    let self = this
    self[method] = (...args) => {
      return self.rpc[api][method].apply(self, args)
    }
  }

  constructor (options) {
    let self = this

    let provider = options.provider
    let v3 = options.v3
    let mnemonic = options.mnemonic
    let password = options.password

    self.rpc = new RPC(provider)

    console.log(options)

    let rpcMethods = [
      ['personal', 'newAccount'],
      ['personal', 'sendTransaction'],
      ['personal', 'sign'],
      ['personal', 'ecRecover'],
      ['parity', 'allAccountsInfo'],
      ['parity', 'changePassword'],
      ['parity', 'deriveAddressHash'],
      ['parity', 'deriveAddressIndex'],
      ['parity', 'exportAccount'],
      ['parity', 'killAccount'],
      ['parity', 'newAccountFromPhrase'],
      ['parity', 'newAccountFromSecret'],
      ['parity', 'newAccountFromWallet'],
      ['parity', 'removeAddress'],
      ['parity', 'testPassword']
    ]

    rpcMethods.forEach(method => {
      self.assign(method[0], method[1])
    })

    if (v3 && password) {
      this.newAccountFromWallet(v3, password)
        .then(address => {
          self._address = address
        })
        .catch(console.error)
    } else if (mnemonic && password) {
      this.fromMnemonic(mnemonic, password)
    }
  }

  /**
   * Retrieve address once wallet is initialized.
   * @param {string} format - Formatting : can be buffer or string.
   * @returns {string} - Address for the given wallet instance.
   */

  address () {
    return this._address
  }

  /**
   * Initializes privKey, pubKey and address from mnemonic.
   * @param {string} mnemonic - Mnemonic.
   */
  fromMnemonic (mnemonic, password) {
    let self = this
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Invalid mnemonic provided to Wallet.fromMnemonic :' + mnemonic)
    }

    delete this.mnemonic
    delete this.instance

    this.rpc.parity.newAccountFromPhrase(mnemonic, password)
      .then(address => {
        self._address = address
        self.emit('ready', this)
      })
  }

  /**
   * Initializes the current wallet with the given hdkey
   * @param {string} masterMnemonicSeed - Mnemonic.
   */
  fromHDKey (hdkey) {
    delete this.mnemonic
    delete this.instance
    this.instance = hdkey
  }

  wasSigned (hex, signed) {
    let self = this
    return new Promise((resolve, reject) => {
      self.ecRecover(hex, signed)
        .then(address => {
          resolve(address === self.address())
        })
        .catch(reject)
    })
  }
}

util.inherits(RPCWallet, EventEmitter)

module.exports = RPCWallet
