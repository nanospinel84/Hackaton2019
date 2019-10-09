const identity = require('./contracts/identity.json')
const express = require('express')
const Web3 = require('web3')
const poeWallet = require('./poe-wallet-master')
const sign= require('./sign')
const bodyParser = require('body-parser')
const web3 = require('./config/config')
let contract = new web3.eth.Contract(identity.abi)

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//routes
app.put('/', (req,res) => {
})

//servidor
app.listen(port,() => {
    console.log(`Servidor corriendo por el  ${port}`)
})