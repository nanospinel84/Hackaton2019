/* eslint-env mocha */

// const mocha = require('mocha')
const chai = require('chai')
// const should = chai.should()
const assert = chai.assert
const expect = chai.expect

const poeWallet = require('../index.js')

// We assign each lib to a single var
const util = poeWallet.util
const Wallet = poeWallet.Wallet
const rpc = new poeWallet.RPC('http://localhost:8540')

// const path = require('path')

let defaultWallet

let defaultMnemonic// = 'home october plastic room chief proof raise battle churn hint practice drama'
let defaultNamespace = 'Test name space :D'
let defaultMessage = 'This is a message :D'

let defaultSigned

let v3Wallet
let v3WalletJSON

describe('HDWallet tests', () => {
  describe('Error coverage on uninitialized wallets', () => {
    it('Should request privateKey and throw an error since wallet doesn\'t have an instance', () => {
      let errorWallet = new Wallet()
      try {
        errorWallet.privateKey()
      } catch (e) {
        expect(e).to.be.a('error')
      }
    })

    it('Should request a publicKey and throw an error since wallet doesn\'t have an instance', () => {
      let errorWallet = new Wallet()
      try {
        errorWallet.publicKey()
      } catch (e) {
        expect(e).to.be.a('error')
      }
    })

    it('Should request an address and throw an error since wallet doesn\'t have an instance', () => {
      let errorWallet = new Wallet()
      try {
        errorWallet.address()
      } catch (e) {
        expect(e).to.be.a('error')
      }
    })

    it('Should throw an error on invalid mnemonic provided', () => {
      let errorWallet = new Wallet()
      try {
        errorWallet.fromMnemonic('invalidMnemonic :D')
      } catch (e) {
        expect(e).to.be.a('error')
      }
    })

    it('Should throw an error or invalid signature provided', () => {
      try {
        util.verifySignature(defaultSigned + 'kkk', '0xcafe')
      } catch (e) {
        expect(e).to.be.a('error')
      }
    })
  })
  describe('HDWallet util tests', () => {
    it('Should generate a mnemonic to be used later on tests as buffer', () => {
      let mnemonic = util.createMnemonic('string')
      expect(mnemonic).to.be.a('string')
      assert.isNotEmpty(mnemonic)

      defaultMnemonic = mnemonic
    })

    it('Should add "0x" prefix to a given address or key without it', () => {
      let unprefixedKey = '034c4d145791fb81ae5f5cc6b8290e12ab73818b1eaaa42a95c26f488dfcbd6887'
      let prefixed = util.addHexPrefix(unprefixedKey)
      expect(prefixed).to.be.a('string')
      expect(prefixed).to.have.a.lengthOf(unprefixedKey.length + 2)
      expect(prefixed).to.be.equal('0x' + unprefixedKey)
    })

    it('Should return a "0x" prefixed address or key as is (must NOT add extra "0x")', () => {
      let prefixedKey = '0x034c4d145791fb81ae5f5cc6b8290e12ab73818b1eaaa42a95c26f488dfcbd6887'
      let prefixed = util.addHexPrefix(prefixedKey)
      expect(prefixed).to.be.a('string')
      expect(prefixed).to.have.a.lengthOf(prefixedKey.length)
      expect(prefixed).to.be.equal(prefixedKey)
    })
  })

  describe('HDWallet generation', () => {
    it('Should create a new wallet instance from a given mnemonic', () => {
      defaultWallet = new Wallet(defaultMnemonic)
      expect(defaultWallet).to.include.keys('mnemonicSeed')
      expect(defaultWallet).to.include.keys('instance')
    })

    it('Should import a wallet from a given mnemonic as string', () => {
      let mnemonic = util.createMnemonic()
      defaultWallet = new Wallet()
      defaultWallet.fromMnemonic(mnemonic)

      expect(defaultWallet).to.include.keys('mnemonicSeed')
      expect(defaultWallet).to.include.keys('instance')
    })
  })

  describe('HDWallet getters (public and private key, address) as buffer and string', () => {
    it('Should retrieve the private key for defaultWallet as a buffer', () => {
      let privateKey = defaultWallet.privateKey()
      expect(privateKey).to.be.instanceOf(Buffer)
      assert.isNotEmpty(privateKey)
    })

    it('Should retrieve the private key for defaultWallet as a string', () => {
      let privateKey = defaultWallet.privateKey('string')
      expect(privateKey).to.be.a('string')
      assert.isNotEmpty(privateKey)
    })

    it('Should retrieve the public key for defaultWallet as a buffer', () => {
      let publicKey = defaultWallet.publicKey()
      expect(publicKey).to.be.instanceOf(Buffer)
      assert.isNotEmpty(publicKey)
    })

    it('Should retrieve the public key for defaultWallet as a string', () => {
      let publicKey = defaultWallet.publicKey('string')
      expect(publicKey).to.be.a('string')
      assert.isNotEmpty(publicKey)
    })

    it('Should retrieve the address for defaultWallet as a buffer', () => {
      let address = defaultWallet.address()
      expect(address).to.be.instanceOf(Buffer)
      assert.isNotEmpty(address)
    })

    it('Should retrieve the address for defaultWallet as a string', () => {
      let address = defaultWallet.address('string')
      expect(address).to.be.a('string')
      assert.isNotEmpty(address)
    })
  })

  describe('HDWallet address generation', () => {
    it('Should generate 5 wallet objects on defaultNamespace', () => {
      let wallets = defaultWallet.getWallets(defaultNamespace, 5)
      expect(wallets).to.be.an('array')
      expect(wallets).to.have.a.lengthOf(5)
      expect(wallets[0]).to.be.instanceOf(Wallet)
    })

    it('Should retrieve 5 addresses from defaultNamespace', () => {
      let addresses = defaultWallet.getAddresses(defaultNamespace, 5)
      expect(addresses).to.be.an('array')
      expect(addresses).to.have.a.lengthOf(5)
      expect(addresses[0]).to.be.a('string')
    })
    /*
    it('Should sign the defaultMessage', () => {
      let signed = defaultWallet.sign(defaultMessage)
      expect(signed).to.be.a('string')
    })
    */
  })

  describe('HDWallet: Sign, verify, encrypt, decrypt', () => {
    it('sign using first child on defaultNamespace', () => {
      defaultSigned = defaultWallet.getWallets(defaultNamespace, 1)[0].sign(defaultMessage)
      // console.log('addr:', defaultWallet.getWallets(defaultNamespace, 1)[0].address('string'))
      expect(defaultSigned).to.be.a('string')
    })

    it('Should verify defaultSigned', () => {
      let isValid = util.verifySignature(defaultSigned, defaultWallet.getAddresses(defaultNamespace, 1)[0])
      // console.log('isValid', isValid)
      expect(isValid).to.be.a('boolean')
      expect(isValid).to.be.equal(true)
    })
  })

  describe('HDWallet interactions with JSON RPC API', () => {
    let tmpAddress

    it('Should cause a JSON error on the RPC instance', (done) => {
      rpc.post('nonExistantMethod', [])
        .then(() => {
          done('This is serious, a method named "nonExistantMethod" worked against RPC API.')
        })
        .catch(e => {
          expect(e).to.be.an('error')
          done()
        })
    })

    it('Should ping a RPC provider for status', (done) => {
      rpc.net.listening()
        .then(isListening => {
          expect(isListening).to.equal(true)
          done()
        })
        .catch(done)
    })

    it('Should create an account on the node with desired password', (done) => {
      rpc.personal.newAccount('123456')
        .then(createdAddress => {
          tmpAddress = createdAddress
          done()
        })
        .catch(done)
    })

    it('Should unlock an account given it\'s address and password', (done) => {
      rpc.personal.unlockAccount(
        tmpAddress,
        '123456',
        null
      )
        .then(isUnlocked => {
          expect(isUnlocked).to.equal(true)
          done()
        })
        .catch(done)
    })
  })

  describe('HDWallet V3 methods', () => {
    it('Should export the defaultWallet as a V3 string', () => {
      v3WalletJSON = defaultWallet.toV3String('q1w2e3r4t5y6u7i8o9')
      expect(v3WalletJSON).to.be.a('string')
    })

    it('Should import a wallet given a V3 string and a password using new Wallet()', () => {
      v3Wallet = new Wallet(v3WalletJSON, 'q1w2e3r4t5y6u7i8o9')
      expect(v3Wallet.address('string')).to.equal(defaultWallet.address('string'))
    })

    it('Should import a wallet from a V3 string calling .fromV3', () => {
      let w = defaultWallet.fromV3(v3WalletJSON, 'q1w2e3r4t5y6u7i8o9')
      expect(w.address('string')).to.equal(defaultWallet.address('string'))
    })

    it('Should throw an error when creating wallet from V3 and wrong password', () => {
      try {
        v3Wallet = new Wallet(v3WalletJSON, 'q1w2e3r4t5y6u7i8o9p')
      } catch (e) {
        expect(e).to.be.a('error')
      }
    })
  })
})
