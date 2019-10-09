const express = require('express')

class Server {

  constructor (port) {
    this.app = express()

    this.app.listen(port, () => {
      console.log('Identity API listening on port', port)
    })
  }
}

module.exports = Server
