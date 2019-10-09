# Caelum HDWallet

## Installing as an npm package
```bash
npm install git+https://gitlab.com/caelum-labs/poe-wallet/
```

## Installing for dev
```bash
git clone https://gitlab.com/caelum-labs/poe-wallet/
cd poe-wallet
```

## Testing
```bash
npm test
```

## Examples
Examples can be found in the [examples](./examples) folder.

- [01 - Create a wallet](./examples/01-create-wallet.js)
- [02 - Deriving wallets](./examples/02-derive-wallets.js)
- [03 - Sign and verify a message](./examples/03-sign-verify.js)
- [04 - RPC raw interactions](./examples/04-rpc-interaction.js)
- [05 - Send a transaction using RPC](./examples/05-rpc-send-tx.js)

## Requires
- [BIP39](https://github.com/bitcoinjs/bip39)
- [ethereumjs-util](https://github.com/ethereumjs/ethereumjs-util)
- [JS SHA3](https://github.com/emn178/js-sha3)
- [HDKey](https://github.com/cryptocoinjs/hdkey)
- [Base64](https://github.com/dankogai/js-base64)
- [superagent](https://visionmedia.github.io/superagent/)
- [randomBytes](https://www.npmjs.com/package/random-bytes)
- [pbkdf2](https://www.npmjs.com/package/pbkdf2)
- [CryptoJS](https://www.npmjs.com/package/crypto-js)
- [AES JS](https://github.com/ricmoo/aes-js)
- [UUID](https://github.com/kelektiv/node-uuid)

## WalletUtils class
- createMnemonic();
- verifySignature( base64Signed, address );
- addHexPrefix( str );
- pubToAddress( publicKeyBuffer );
- namespaceToNumber (namespace, hashLength);
- hashPersonalMessage( stringOrBuffer );
- ecsign (hash, privateKey);
- nodeListening (provider);
- createAccount (provider, password);
- unlockAccount (provider, address, password, ttl);


## Wallet
**Kind**: global class  

* [Wallet](#Wallet)
    * [.privateKey(format)](#Wallet+privateKey) ⇒ <code>string</code>
    * [.publicKey(format)](#Wallet+publicKey) ⇒ <code>string</code>
    * [.address(format)](#Wallet+address) ⇒ <code>string</code>
    * [.fromMnemonic(mnemonicSeed)](#Wallet+fromMnemonic)
    * [.fromHDKey(masterMnemonicSeed)](#Wallet+fromHDKey)
    * [.getWallets(namespace, addressCount)](#Wallet+getWallets) ⇒ <code>Array</code>
    * [.getAddresses(namespace, addressCount)](#Wallet+getAddresses) ⇒ <code>Array</code>
    * [.sign(messageStr)](#Wallet+sign) ⇒ <code>string</code>
    * [.toV3(password)](#Wallet+toV3) ⇒ <code>object</code>
    * [.toV3String(password)](#Wallet+toV3String) ⇒ <code>string</code>
    * [.fromV3(input, password)](#Wallet+fromV3) ⇒ [<code>Wallet</code>](#Wallet)

<a name="Wallet+privateKey"></a>

### wallet.privateKey(format) ⇒ <code>string</code>
Retrieve private key once wallet is initialized.

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>string</code> - - private key for the given wallet instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| format | <code>string</code> | <code>&quot;buffer&quot;</code> | Formatting : can be buffer or string. |

<a name="Wallet+publicKey"></a>

### wallet.publicKey(format) ⇒ <code>string</code>
Retrieve public key once wallet is initialized.

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>string</code> - - Public key for the given wallet instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| format | <code>string</code> | <code>&quot;buffer&quot;</code> | Formatting : can be buffer or string. |

<a name="Wallet+address"></a>

### wallet.address(format) ⇒ <code>string</code>
Retrieve address once wallet is initialized.

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>string</code> - - Address for the given wallet instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| format | <code>string</code> | <code>&quot;buffer&quot;</code> | Formatting : can be buffer or string. |

<a name="Wallet+fromMnemonic"></a>

### wallet.fromMnemonic(mnemonicSeed)
Initializes privKey, pubKey and address from mnemonic.

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  

| Param | Type | Description |
| --- | --- | --- |
| mnemonicSeed | <code>string</code> | Mnemonic. |

<a name="Wallet+fromHDKey"></a>

### wallet.fromHDKey(masterMnemonicSeed)
Initializes the current wallet with the given hdkey

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  

| Param | Type | Description |
| --- | --- | --- |
| masterMnemonicSeed | <code>string</code> | Mnemonic. |

<a name="Wallet+getWallets"></a>

### wallet.getWallets(namespace, addressCount) ⇒ <code>Array</code>
Generates `addressCount` accounts on provided `namespace`

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>Array</code> - - Wallets  

| Param | Type | Description |
| --- | --- | --- |
| namespace | <code>string</code> | Namespace for generation. |
| addressCount | <code>number</code> | How many addresses are to be generated. |

<a name="Wallet+getAddresses"></a>

### wallet.getAddresses(namespace, addressCount) ⇒ <code>Array</code>
Generates `addressCount` accounts on provided `namespace`

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>Array</code> - - Addresses  

| Param | Type | Description |
| --- | --- | --- |
| namespace | <code>string</code> | Namespace for generation. |
| addressCount | <code>number</code> | How many addresses are to be generated. |

<a name="Wallet+sign"></a>

### wallet.sign(messageStr) ⇒ <code>string</code>
Signs a given message with the current wallet

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>string</code> - - Base64 encoded json object with hash and signature  

| Param | Type | Description |
| --- | --- | --- |
| messageStr | <code>string</code> | Message to sign |

<a name="Wallet+toV3"></a>

### wallet.toV3(password) ⇒ <code>object</code>
Exports the instance of the wallet to a V3 object

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>object</code> - - V3 Object  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | To protect the file |

<a name="Wallet+toV3String"></a>

### wallet.toV3String(password) ⇒ <code>string</code>
Exports the current wallet to a V3 string

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>string</code> - - JSON-encoded V3 wallet  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | To encrypt the export |

<a name="Wallet+fromV3"></a>

### wallet.fromV3(input, password) ⇒ [<code>Wallet</code>](#Wallet)
Imports a wallet from it's V3 expression

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Returns**: [<code>Wallet</code>](#Wallet) - - New instance using the wallet  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | JSON-encoded V3 wallet |
| password | <code>string</code> | To encrypt the export |


## RPC class
```javascript
// Include the RPC class
const RPC = require('poe-wallet').RPC;

// Create an instance to interact with Parity node
let rpcInstance = new RPC('http://localhost:8545');
```
Methods are loaded from the [json source](./rpc-apis.json) :
- [rpcInstance.web3.clientVersion](https://wiki.parity.io/JSONRPC-web3-module.html#web3_clientVersion)
- [rpcInstance.web3.sha3](https://wiki.parity.io/JSONRPC-web3-module.html#web3_sha3)
- [rpcInstance.net.listening](https://wiki.parity.io/JSONRPC-net-module.html#net_listening)
- [rpcInstance.net.peerCount](https://wiki.parity.io/JSONRPC-net-module.html#net_peerCount)
- [rpcInstance.net.version](https://wiki.parity.io/JSONRPC-net-module.html#net_version)
- [rpcInstance.eth.accounts](https://wiki.parity.io/JSONRPC-eth-module.html#eth_accounts)
- [rpcInstance.eth.blockNumber](https://wiki.parity.io/JSONRPC-eth-module.html#eth_blockNumber)
- [rpcInstance.eth.call](https://wiki.parity.io/JSONRPC-eth-module.html#eth_call)
- [rpcInstance.eth.coinbase](https://wiki.parity.io/JSONRPC-eth-module.html#eth_coinbase)
- [rpcInstance.eth.estimateGas](https://wiki.parity.io/JSONRPC-eth-module.html#eth_estimateGas)
- [rpcInstance.eth.gasPrice](https://wiki.parity.io/JSONRPC-eth-module.html#eth_gasPrice)
- [rpcInstance.eth.getBalance](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getBalance)
- [rpcInstance.eth.getBlockByHash](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getBlockByHash)
- [rpcInstance.eth.getBlockByNumber](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getBlockByNumber)
- [rpcInstance.eth.getBlockTransactionCountByHash](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getBlockTransactionCountByHash)
- [rpcInstance.eth.getBlockTransactionCountByNumber](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getBlockTransactionCountByNumber)
- [rpcInstance.eth.getCode](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getCode)
- [rpcInstance.eth.getFilterChanges](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getFilterChanges)
- [rpcInstance.eth.getFilterLogs](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getFilterLogs)
- [rpcInstance.eth.getLogs](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getLogs)
- [rpcInstance.eth.getStorageAt](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getStorageAt)
- [rpcInstance.eth.getTransactionByBlockHashAndIndex](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getTransactionByBlockHashAndIndex)
- [rpcInstance.eth.getTransactionByBlockNumberAndIndex](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getTransactionByBlockNumberAndIndex)
- [rpcInstance.eth.getTransactionByHash](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getTransactionByHash)
- [rpcInstance.eth.getTransactionCount](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getTransactionCount)
- [rpcInstance.eth.getTransactionReceipt](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getTransactionReceipt)
- [rpcInstance.eth.getUncleByBlockHashAndIndex](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getUncleByBlockHashAndIndex)
- [rpcInstance.eth.getUncleByBlockNumberAndIndex](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getUncleByBlockNumberAndIndex)
- [rpcInstance.eth.getUncleCountByBlockHash](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getUncleCountByBlockHash)
- [rpcInstance.eth.getUncleCountByBlockNumber](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getUncleCountByBlockNumber)
- [rpcInstance.eth.getWork](https://wiki.parity.io/JSONRPC-eth-module.html#eth_getWork)
- [rpcInstance.eth.hashrate](https://wiki.parity.io/JSONRPC-eth-module.html#eth_hashrate)
- [rpcInstance.eth.mining](https://wiki.parity.io/JSONRPC-eth-module.html#eth_mining)
- [rpcInstance.eth.newBlockFilter](https://wiki.parity.io/JSONRPC-eth-module.html#eth_newBlockFilter)
- [rpcInstance.eth.newFilter](https://wiki.parity.io/JSONRPC-eth-module.html#eth_newFilter)
- [rpcInstance.eth.newPendingTransactionFilter](https://wiki.parity.io/JSONRPC-eth-module.html#eth_newPendingTransactionFilter)
- [rpcInstance.eth.protocolVersion](https://wiki.parity.io/JSONRPC-eth-module.html#eth_protocolVersion)
- [rpcInstance.eth.sendRawTransaction](https://wiki.parity.io/JSONRPC-eth-module.html#eth_sendRawTransaction)
- [rpcInstance.eth.sendTransaction](https://wiki.parity.io/JSONRPC-eth-module.html#eth_sendTransaction)
- [rpcInstance.eth.sign](https://wiki.parity.io/JSONRPC-eth-module.html#eth_sign)
- [rpcInstance.eth.signTransaction](https://wiki.parity.io/JSONRPC-eth-module.html#eth_signTransaction)
- [rpcInstance.eth.submitHashrate](https://wiki.parity.io/JSONRPC-eth-module.html#eth_submitHashrate)
- [rpcInstance.eth.submitWork](https://wiki.parity.io/JSONRPC-eth-module.html#eth_submitWork)
- [rpcInstance.eth.syncing](https://wiki.parity.io/JSONRPC-eth-module.html#eth_syncing)
- [rpcInstance.eth.uninstallFilter](https://wiki.parity.io/JSONRPC-eth-module.html#eth_uninstallFilter)
- [rpcInstance.parity.cidV0](https://wiki.parity.io/JSONRPC-parity-module.html#parity_cidV0)
- [rpcInstance.parity.composeTransaction](https://wiki.parity.io/JSONRPC-parity-module.html#parity_composeTransaction)
- [rpcInstance.parity.consensusCapability](https://wiki.parity.io/JSONRPC-parity-module.html#parity_consensusCapability)
- [rpcInstance.parity.decryptMessage](https://wiki.parity.io/JSONRPC-parity-module.html#parity_decryptMessage)
- [rpcInstance.parity.encryptMessage](https://wiki.parity.io/JSONRPC-parity-module.html#parity_encryptMessage)
- [rpcInstance.parity.futureTransactions](https://wiki.parity.io/JSONRPC-parity-module.html#parity_futureTransactions)
- [rpcInstance.parity.allTransactions](https://wiki.parity.io/JSONRPC-parity-module.html#parity_allTransactions)
- [rpcInstance.parity.getBlockHeaderByNumber](https://wiki.parity.io/JSONRPC-parity-module.html#parity_getBlockHeaderByNumber)
- [rpcInstance.parity.listOpenedVaults](https://wiki.parity.io/JSONRPC-parity-module.html#parity_listOpenedVaults)
- [rpcInstance.parity.listStorageKeys](https://wiki.parity.io/JSONRPC-parity-module.html#parity_listStorageKeys)
- [rpcInstance.parity.listVaults](https://wiki.parity.io/JSONRPC-parity-module.html#parity_listVaults)
- [rpcInstance.parity.localTransactions](https://wiki.parity.io/JSONRPC-parity-module.html#parity_localTransactions)
- [rpcInstance.parity.releasesInfo](https://wiki.parity.io/JSONRPC-parity-module.html#parity_releasesInfo)
- [rpcInstance.parity.signMessage](https://wiki.parity.io/JSONRPC-parity-module.html#parity_signMessage)
- [rpcInstance.parity.versionInfo](https://wiki.parity.io/JSONRPC-parity-module.html#parity_versionInfo)
- [rpcInstance.parity.changeVault](https://wiki.parity.io/JSONRPC-parity-module.html#parity_changeVault)
- [rpcInstance.parity.changeVaultPassword](https://wiki.parity.io/JSONRPC-parity-module.html#parity_changeVaultPassword)
- [rpcInstance.parity.closeVault](https://wiki.parity.io/JSONRPC-parity-module.html#parity_closeVault)
- [rpcInstance.parity.getVaultMeta](https://wiki.parity.io/JSONRPC-parity-module.html#parity_getVaultMeta)
- [rpcInstance.parity.newVault](https://wiki.parity.io/JSONRPC-parity-module.html#parity_newVault)
- [rpcInstance.parity.openVault](https://wiki.parity.io/JSONRPC-parity-module.html#parity_openVault)
- [rpcInstance.parity.setVaultMeta](https://wiki.parity.io/JSONRPC-parity-module.html#parity_setVaultMeta)
- [rpcInstance.parity.accountsInfo](https://wiki.parity.io/JSONRPC-parity-module.html#parity_accountsInfo)
- [rpcInstance.parity.checkRequest](https://wiki.parity.io/JSONRPC-parity-module.html#parity_checkRequest)
- [rpcInstance.parity.defaultAccount](https://wiki.parity.io/JSONRPC-parity-module.html#parity_defaultAccount)
- [rpcInstance.parity.generateSecretPhrase](https://wiki.parity.io/JSONRPC-parity-module.html#parity_generateSecretPhrase)
- [rpcInstance.parity.hardwareAccountsInfo](https://wiki.parity.io/JSONRPC-parity-module.html#parity_hardwareAccountsInfo)
- [rpcInstance.parity.listAccounts](https://wiki.parity.io/JSONRPC-parity-module.html#parity_listAccounts)
- [rpcInstance.parity.phraseToAddress](https://wiki.parity.io/JSONRPC-parity-module.html#parity_phraseToAddress)
- [rpcInstance.parity.postSign](https://wiki.parity.io/JSONRPC-parity-module.html#parity_postSign)
- [rpcInstance.parity.postTransaction](https://wiki.parity.io/JSONRPC-parity-module.html#parity_postTransaction)
- [rpcInstance.parity.defaultExtraData](https://wiki.parity.io/JSONRPC-parity-module.html#parity_defaultExtraData)
- [rpcInstance.parity.extraData](https://wiki.parity.io/JSONRPC-parity-module.html#parity_extraData)
- [rpcInstance.parity.gasCeilTarget](https://wiki.parity.io/JSONRPC-parity-module.html#parity_gasCeilTarget)
- [rpcInstance.parity.gasFloorTarget](https://wiki.parity.io/JSONRPC-parity-module.html#parity_gasFloorTarget)
- [rpcInstance.parity.minGasPrice](https://wiki.parity.io/JSONRPC-parity-module.html#parity_minGasPrice)
- [rpcInstance.parity.transactionsLimit](https://wiki.parity.io/JSONRPC-parity-module.html#parity_transactionsLimit)
- [rpcInstance.parity.devLogs](https://wiki.parity.io/JSONRPC-parity-module.html#parity_devLogs)
- [rpcInstance.parity.devLogsLevels](https://wiki.parity.io/JSONRPC-parity-module.html#parity_devLogsLevels)
- [rpcInstance.parity.chain](https://wiki.parity.io/JSONRPC-parity-module.html#parity_chain)
- [rpcInstance.parity.chainId](https://wiki.parity.io/JSONRPC-parity-module.html#parity_chainId)
- [rpcInstance.parity.chainStatus](https://wiki.parity.io/JSONRPC-parity-module.html#parity_chainStatus)
- [rpcInstance.parity.gasPriceHistogram](https://wiki.parity.io/JSONRPC-parity-module.html#parity_gasPriceHistogram)
- [rpcInstance.parity.netChain](https://wiki.parity.io/JSONRPC-parity-module.html#parity_netChain)
- [rpcInstance.parity.netPeers](https://wiki.parity.io/JSONRPC-parity-module.html#parity_netPeers)
- [rpcInstance.parity.netPort](https://wiki.parity.io/JSONRPC-parity-module.html#parity_netPort)
- [rpcInstance.parity.nextNonce](https://wiki.parity.io/JSONRPC-parity-module.html#parity_nextNonce)
- [rpcInstance.parity.pendingTransactions](https://wiki.parity.io/JSONRPC-parity-module.html#parity_pendingTransactions)
- [rpcInstance.parity.pendingTransactionsStats](https://wiki.parity.io/JSONRPC-parity-module.html#parity_pendingTransactionsStats)
- [rpcInstance.parity.registryAddress](https://wiki.parity.io/JSONRPC-parity-module.html#parity_registryAddress)
- [rpcInstance.parity.removeTransaction](https://wiki.parity.io/JSONRPC-parity-module.html#parity_removeTransaction)
- [rpcInstance.parity.rpcSettings](https://wiki.parity.io/JSONRPC-parity-module.html#parity_rpcSettings)
- [rpcInstance.parity.unsignedTransactionsCount](https://wiki.parity.io/JSONRPC-parity-module.html#parity_unsignedTransactionsCount)
- [rpcInstance.parity.dappsUrl](https://wiki.parity.io/JSONRPC-parity-module.html#parity_dappsUrl)
- [rpcInstance.parity.enode](https://wiki.parity.io/JSONRPC-parity-module.html#parity_enode)
- [rpcInstance.parity.mode](https://wiki.parity.io/JSONRPC-parity-module.html#parity_mode)
- [rpcInstance.parity.nodeKind](https://wiki.parity.io/JSONRPC-parity-module.html#parity_nodeKind)
- [rpcInstance.parity.nodeName](https://wiki.parity.io/JSONRPC-parity-module.html#parity_nodeName)
- [rpcInstance.parity.wsUrl](https://wiki.parity.io/JSONRPC-parity-module.html#parity_wsUrl)
- [rpcInstance.trace.call](https://wiki.parity.io/JSONRPC-trace-module.html#trace_call)
- [rpcInstance.trace.rawTransaction](https://wiki.parity.io/JSONRPC-trace-module.html#trace_rawTransaction)
- [rpcInstance.trace.replayTransaction](https://wiki.parity.io/JSONRPC-trace-module.html#trace_replayTransaction)
- [rpcInstance.trace.replayBlockTransactions](https://wiki.parity.io/JSONRPC-trace-module.html#trace_replayBlockTransactions)
- [rpcInstance.trace.block](https://wiki.parity.io/JSONRPC-trace-module.html#trace_block)
- [rpcInstance.trace.filter](https://wiki.parity.io/JSONRPC-trace-module.html#trace_filter)
- [rpcInstance.trace.get](https://wiki.parity.io/JSONRPC-trace-module.html#trace_get)
- [rpcInstance.trace.transaction](https://wiki.parity.io/JSONRPC-trace-module.html#trace_transaction)
- [rpcInstance.shh.info](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_info)
- [rpcInstance.shh.newKeyPair](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_newKeyPair)
- [rpcInstance.shh.addPrivateKey](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_addPrivateKey)
- [rpcInstance.shh.newSymKey](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_newSymKey)
- [rpcInstance.shh.addSymKey](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_addSymKey)
- [rpcInstance.shh.getPublicKey](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_getPublicKey)
- [rpcInstance.shh.getPrivateKey](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_getPrivateKey)
- [rpcInstance.shh.getSymKey](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_getSymKey)
- [rpcInstance.shh.deleteKey](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_deleteKey)
- [rpcInstance.shh.post](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_post)
- [rpcInstance.shh.newMessageFilter](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_newMessageFilter)
- [rpcInstance.shh.getFilterMessages](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_getFilterMessages)
- [rpcInstance.shh.deleteMessageFilter](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_deleteMessageFilter)
- [rpcInstance.shh.subscribe](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_subscribe)
- [rpcInstance.shh.unsubscribe](https://wiki.parity.io/JSONRPC-shh-Module.html#shh_unsubscribe)
- [rpcInstance.personal.listAccounts](https://wiki.parity.io/JSONRPC-personal-module.html#personal_listAccounts)
- [rpcInstance.personal.newAccount](https://wiki.parity.io/JSONRPC-personal-module.html#personal_newAccount)
- [rpcInstance.personal.sendTransaction](https://wiki.parity.io/JSONRPC-personal-module.html#personal_sendTransaction)
- [rpcInstance.personal.signTransaction](https://wiki.parity.io/JSONRPC-personal-module.html#personal_signTransaction)
- [rpcInstance.personal.unlockAccount](https://wiki.parity.io/JSONRPC-personal-module.html#personal_unlockAccount)
- [rpcInstance.personal.sign](https://wiki.parity.io/JSONRPC-personal-module.html#personal_sign)
- [rpcInstance.personal.ecRecover](https://wiki.parity.io/JSONRPC-personal-module.html#personal_ecRecover)
