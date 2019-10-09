var Web3 = require('web3');

exports.web3 = function (env) {
var web3 = new Web3(new Web3.providers.HttpProvider(env.HTTP_PROVIDER));
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
}
else {
  web3 = new Web3(new Web3.providers.HttpProvider(env.HTTP_PROVIDER))
}
return web3;
}
//module.exports = web3;