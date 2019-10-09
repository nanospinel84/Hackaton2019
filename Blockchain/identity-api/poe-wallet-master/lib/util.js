const bip39 = require('bip39')
const EthereumjsUtil = require('ethereumjs-util')
const shake256 = require('js-sha3').shake256
const Base64 = require('base-64')

const util = {

  /**
   * @dev Creates a random mnemonic
   * @returns {string} - Mnemonic
   */
  createMnemonic: () => {
    return bip39.generateMnemonic()
  },

  /**
   * @dev Verifies that a given signature (b64 encoded) is signed by an address
   * @param {string} b64Signed - Signature to verify
   * @param {string} address - Address to verify against
   * @returns {boolean} - If signature was performed by address
   */
  verifySignature: (b64Signed, address) => {
    try {
      let json = Base64.decode(b64Signed)
      let params = JSON.parse(json)

      // retrieve address that signed the message
      let messageSigner = EthereumjsUtil.addHexPrefix(
        EthereumjsUtil.pubToAddress(
          EthereumjsUtil.ecrecover(
            Buffer.from(params.hash, 'hex'),
            params.v,
            Buffer.from(params.r, 'hex'),
            Buffer.from(params.s, 'hex')
          )
        ).toString('hex')
      )

      return (parseInt(address, 16) === parseInt(messageSigner, 16))
    } catch (e) {
      throw e
    }
  },

  /**
   * @dev Adds the hex prefix ('0x') to hex strings, if not already there
   * @param {string} str - Hex string to add prefix to
   * @returns {string} - Prefixed hex string
   */
  addHexPrefix: (str) => {
    return EthereumjsUtil.addHexPrefix(str)
  },

  /**
   * @dev Turns a public key into an address
   * @param {Buffer} publicKeyBuffer - Public key buffer
   * @returns {string} - Derived address
   */

  pubToAddress: (publicKeyBuffer) => {
    return EthereumjsUtil.pubToAddress(publicKeyBuffer, 'true')
  },

  /**
   * @dev Turns a namespace string into a number
   * @param {string} namespace - Namespace for generation.
   * @param {number} hashLength - Length for the shake256 hash generated.
   * @returns {number} - Keccak, as number, of given namespace
   */
  namespaceToNumber: (namespace, count, hashLength) => {
    let hash = shake256(namespace + count.toString(16), hashLength)
    return parseInt(hash, 16)
  },

  /**
   * @dev Hashes a message
   * @param {string} stringOrBuffer - String or buffer representing the message
   * @returns {Buffer} -Hashed message
   */
  hashPersonalMessage: (stringOrBuffer) => {
    return EthereumjsUtil.hashPersonalMessage(stringOrBuffer)
  },

  /**
   * @dev Signs a hash with given privateKey
   * @param {Buffer} hash - Hash to sign
   * @param {Buffer} privateKey - Private key to sign with
   * @returns {Object} - Signature object
   */
  ecsign: (hash, privateKey) => {
    return EthereumjsUtil.ecsign(hash, privateKey)
  },

  keccak256: (input) => {
    return '0x' + EthereumjsUtil.keccak256(input).toString('hex')
  }
}

module.exports = util
