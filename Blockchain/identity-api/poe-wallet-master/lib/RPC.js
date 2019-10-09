const superagent = require('superagent')
const apis = require('../rpc-apis.json')

class RPC {
  /**
   * @dev Triggers rpc.assign for each loaded api
   */
  constructor (provider) {
    let self = this

    this.provider = provider

    apis.forEach(call => {
      let parts = call.split('_')
      self.assign(parts[0], parts[1])
    })
  }

  /**
   * @dev Assigns each call on rpc-apis.json to this method
   * @param {string} api - API to be called
   * @param {string} method - Method being called
   */
  assign (api, method) {
    let self = this
    if (!self[api]) { self[api] = {} }
    self[api][method] = (...args) => {
      return self.post(api + '_' + method, args)
    }
  }

  /**
   * @dev Queries the Ethereum RPC api on given provider
   * @param {string} provider - HTTP provider
   * @param {string} method - Method being called
   * @param {Array} params - List of parameters to send to RPC ap
   * @returns {Promise} - Resolves on success, throws on error
   */
  postToProvider (provider, method, params) {
    return new Promise((resolve, reject) => {
      superagent
        .post(provider)
        .set('Accept', 'application/json')
        .send({
          method: method,
          params: params,
          id: 1,
          jsonrpc: '2.0'
        })
        .then(httpResponse => {
          if (httpResponse.body.error) {
            console.error(httpResponse.body.error)
            return reject(new Error(httpResponse.body.error.data))
          }
          resolve(httpResponse.body.result)
        })
        .catch(reject)
    })
  }

  /**
   * @dev Queries the Ethereum RPC api on default provider
   * @param {string} method - Method being called
   * @param {Array} params - List of parameters to send to RPC ap
   * @returns {Promise} - Resolves on success, throws on error
   */
  post (method, params) {
    return this.postToProvider(this.provider, method, params)
  }
}

module.exports = RPC
