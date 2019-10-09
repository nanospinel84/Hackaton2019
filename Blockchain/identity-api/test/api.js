let chai = require('chai')
let expect = chai.expect
let chaiHttp = require('chai-http')
chai.use(chaiHttp)

const EthereumTx = require('ethereumjs-tx')


const app = require('../app')
const poeWallet = require('poe-wallet')
const walletUtils = poeWallet.util

const EthUtil = require('ethereumjs-util')

let privateKey
let publicKey
let address
let tx = {}
let signed
let contractAddress
keys = [
  '0x000000000000000000000000000000000000000000000000000000000000cafe'
]
let sk
// Our parent block
describe('Identity coverage', () => {

  // Initial state.
  before((done) => {
    // Set basic wallets
    privateKey = '158e249f855c4ec710d728ceaca3aa6b0562e37c8ed8293c323550e2a59c4b2e'
    publicKey = '0x' + EthUtil.privateToPublic(Buffer.from(privateKey, 'hex')).toString('hex')
    address = '0x' + EthUtil.privateToAddress(Buffer.from(privateKey, 'hex')).toString('hex')

    sk = Buffer.from(privateKey, 'hex')
    done()
  })

  it('Should request the basic tx to deploy the identity', (done) => {
    chai.request('http://localhost:3000')
      .put('/identity/deploy')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('from', address)
      .send({key: keys[0]})
      .then(res => {
        expect(res.body.success).to.equal(true)
        tx = res.body.transaction
        done()
      })
      .catch(done)
  })

  it ('Should sign the tx for the identity', () => {
    cipher = new EthereumTx(tx)

    cipher.sign(sk)

    signed = '0x' + cipher.serialize().toString('hex')
  })

  it ('Should deploy the signed contract', (done) => {
    chai.request('http://localhost:3000')
      .post('/identity/deploy')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('from', address)
      .send({signed})
      .then(res => {
        expect(res.body.success).to.equal(true)
        contractAddress = res.body.address
        done()
      })
      .catch(done)
  })

  it ('Should request and sign addKey', (done) => {
    chai.request('http://localhost:3000')
      .put('/identity/' + contractAddress + '/addKey')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('from', address)
      .send({
        key: keys[0],
        purpose: 27,
        keyType: 3
      })
      .then(res => {
        expect(res.body.success).to.equal(true)
        let tmpTx = res.body.transaction
        cipher = new EthereumTx(tmpTx)
        cipher.sign(sk)

        signed = '0x' + cipher.serialize().toString('hex')

        done()
      })
      .catch(done)
  })

  it ('Should propagate signed "addkey" call', (done) => {
    chai.request('http://localhost:3000')
      .post('/identity/' + contractAddress + '/addKey')
      .set('from', address)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({signed})
      .then(res => {
        expect(res.body.success).to.equal(true)
        done()
      })
      .catch(done)
  })

  it ('Should request the key added on the last call', (done) => {
    chai.request('http://localhost:3000')
      .put('/identity/' + contractAddress + '/getKey')
      .set('from', address)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({key: keys[0]})
      .then(res => {
        expect(res.body.success).to.equal(true)
        done()
      })
      .catch(done)
  })



  it ('Should request and sign addClaim', (done) => {
    chai.request('http://localhost:3000')
      .put('/identity/' + contractAddress + '/addClaim')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('from', address)
      .send({
        topic: 11,
        scheme: 12,
        issuer: address,
        signature: '0x5167a70e',
        data: '0xda7a',
        uri: 'http://uri.com'
      })
      .then(res => {
        let tmpTx = res.body.transaction
        cipher = new EthereumTx(tmpTx)
        cipher.sign(sk)

        signed = '0x' + cipher.serialize().toString('hex')
        done()
      })
      .catch(done)
  })

  it ('Should propagate signed "addClaim" call', (done) => {
    chai.request('http://localhost:3000')
      .post('/identity/' + contractAddress + '/addClaim')
      .set('from', address)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({signed})
      .then(res => {
        expect(res.body.success).to.equal(true)

        done()
      })
      .catch(done)
  })


})
