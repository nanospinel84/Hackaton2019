'use strict';

const env = {
    endpoint: process.env.d07_CONFIG_ENDPOINT || "http://localhost:8770",
    path: process.env.path || "/h2-console/",
    application: process.env.application || "D07.WalletManager",
    profiles: process.env.profiles || ["DEV"],
    label: process.env.label || "latest",
    auth: {
        user: process.env.user || "sa",
        pass: process.env.pass || ""
    }

};

module.exports = env;





