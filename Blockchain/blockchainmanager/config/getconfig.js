const env = require('./env');
const client = require("cloud-config-client");

const options = {
  endpoint: env.endpoint,
  application: env.application,
  profiles: env.profiles,
  label: env.label,
  auth: {
    user: env.auth.user,
    pass: env.auth.pass
  }
}

let config = client.load(options).then(cfg => cfg).catch(error => console.error(error));
module.exports = config;