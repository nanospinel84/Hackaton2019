/* eslint-env mocha */

// const mocha = require('mocha')
const chai = require('chai')
// const should = chai.should()
const expect = chai.expect

const poeWallet = require('../index.js')

// We assign each lib to a single var
const util = poeWallet.util
const Wallet = poeWallet.RPCWallet

// const path = require('path')

let defaultWallet

let defaultMnemonic = 'home october plastic room chief proof raise battle churn hint practice drama'
let defaultNamespace = 'Test name space :D'
let defaultMessage = 'This is a message :D'

let v3WalletJSON

let defaultProvider = 'http://localhost:8540'
let defaultPassword = 'passwordxd'
let defaultAddress
let defaultPrivateKey = '0xcafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe'

describe('RPC Wallet tests', () => {
  describe('HD Wallet generation', () => {
    it('Should throw an error on invalid mnemonic provided', () => {
      try {
        Wallet({
          provider: defaultProvider,
          mnemonic: defaultMnemonic + 'invalid',
          password: defaultPassword
        })
      } catch (e) {
        expect(e).to.be.a('error')
      }
    })

    it('Should create a new wallet instance from a given mnemonic', (done) => {
      defaultWallet = new Wallet({
        provider: defaultProvider,
        mnemonic: defaultMnemonic,
        password: defaultPassword
      })
      defaultWallet.on('ready', () => {
        defaultAddress = defaultWallet.address()
        expect(defaultWallet).to.include.keys('_address')
        done()
      })
    })

    it('Should call properly exportAccount', (done) => {
      defaultWallet.exportAccount(
        defaultAddress,
        defaultPassword
      ).then(res => {
        v3WalletJSON = JSON.stringify(res)
        expect(res).to.include.keys('address')
        expect(res.address).to.equal('0018b4f1f7947ce83cc2cb22152442e468d40a59')
        done()
      }).catch(done)
    })

    it('Should create a new wallet instance from a given v3', (done) => {
      defaultWallet = new Wallet({
        provider: defaultProvider,
        v3: v3WalletJSON,
        password: defaultPassword
      })

      done()
    })
  })

  describe('RPC Parity Accounts', () => {
    it('Should call properly newAccountFromPhrase', (done) => {
      defaultWallet.newAccountFromPhrase(
        defaultMnemonic,
        defaultPassword
      ).then(res => {
        defaultAddress = res
        expect(res).to.equal('0x0018b4f1f7947ce83cc2cb22152442e468d40a59')
        done()
      }).catch(done)
    })
    it('Should call properly allAccountsInfo', (done) => {
      defaultWallet.allAccountsInfo()
        .then(res => {
          expect(res).to.include.keys(defaultAddress)
          done()
        }).catch(done)
    })

    it('Should call properly changePassword', (done) => {
      defaultWallet.changePassword(
        defaultAddress,
        defaultPassword,
        'newpassword'
      ).then(res => {
        defaultPassword = 'newpassword'
        expect(res).to.equal(true)
        done()
      }).catch(done)
    })
    it('Should call properly deriveAddressHash', (done) => {
      defaultWallet.deriveAddressHash(
        defaultAddress,
        defaultPassword,
        {
          hash: util.keccak256(defaultNamespace),
          type: 'hard'
        },
        true
      ).then(res => {
        expect(res).to.equal('0x74a18cadc10ec2550e4209b2bd6bfdfb0b2ef5c8')
        done()
      }).catch(done)
    })
    it('Should call properly deriveAddressIndex', (done) => {
      defaultWallet.deriveAddressIndex(
        defaultAddress,
        defaultPassword,
        [
          {
            index: 99,
            type: 'hard'
          }
        ],
        true
      ).then(res => {
        expect(res).to.equal('0x9880af058e1025391bbde80c77b4c2c106f9d3ac')
        done()
      }).catch(done)
    })

    it('Should call properly newAccountFromSecret', (done) => {
      defaultWallet.newAccountFromSecret(
        defaultPrivateKey,
        defaultPassword
      ).then(res => {
        expect(res).to.equal('0xb0b0aa0d17c9b2b527bbc9d69bd093ab47febeb0')
        done()
      }).catch(done)
    })

    it('Should call properly newAccountFromWallet', (done) => {
      defaultWallet.newAccountFromWallet(
        v3WalletJSON,
        defaultPassword
      ).then(res => {
        expect(res).to.equal('0x0018b4f1f7947ce83cc2cb22152442e468d40a59')
        done()
      }).catch(done)
    })

    it('Should call properly testPassword', (done) => {
      defaultWallet.testPassword(
        defaultAddress,
        defaultPassword
      ).then(res => {
        expect(res).to.equal(true)
        done()
      }).catch(done)
    })

    it('Should call sign and verify', (done) => {
      let hexMessage = '0x' + Buffer.from(defaultMessage).toString('hex')
      defaultWallet.sign(
        hexMessage,
        defaultAddress,
        defaultPassword
      )
        .then(res => {
          return defaultWallet.wasSigned(hexMessage, res)
        })
        .then(isValid => {
          expect(isValid).to.equal(true)
          done()
        }).catch(done)
    })

    it('Should call properly removeAddress', (done) => {
      defaultWallet.removeAddress(
        defaultAddress
      ).then(res => {
        expect(res).to.equal(true)
        done()
      }).catch(done)
    })
    it('Should call properly killAccount', (done) => {
      defaultWallet.killAccount(
        defaultAddress,
        defaultPassword
      ).then(res => {
        expect(res).to.equal(true)
        done()
      }).catch(done)
    })
  })
})
