# Davilaps-poa

Setup Parity PoA network with 3 authorities and 3 members.

# Parity Client


Parity supports a Proof-of-Authority consensus engine to be used with EVM based chains. Proof-of-Authority is a replacement for Proof-of-Work, which can be used for private chain setups.

For consortium setting there are no disadvantages of PoA network as compared to PoW.

 It is more secure (since an attacker with unwanted connection or hacked authority can not overwhelm a network potentially reverting all transactions), less computationally intensive (mining with difficulty which provides security requires lots of computation), more performant (Aura consensus provides lower transaction acceptance latency) and more predictable (blocks are issued at steady time intervals).

PoA deployments are used by the enterprise and by the public (e.g. popular Kovan test network).

# Requirements

- Internet access.
- Previous use of command line interface and unix commands.
- Ubuntu 16.04 LTS version or higher
- 4GB of RAM or more, 20GB SSD

To proceed the reader must be logged into a server using an user account with elevated privileges.


### Setup

0. Install [docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/)
2. Inside the folder 'davilaps-poa' Run `docker-compose up -d`

### Access the Parity UI
Run `docker-compose logs | grep token=` to get an authenticated URL for the Parity UI.

### Access the [ethstats](https://github.com/cubedro/eth-netstats) dashboard.
A nice dashboard is already configured and connected with all the nodes.
Find it at [http://127.0.0.1:3001](http://127.0.0.1:3001).

### Accounts
There is already an account with an empty password that has enough ether:

```
0x6B0c56d1Ad5144b4d37fa6e27DC9afd5C2435c3B
```

And another who is broke:
```
0x00E3d1Aa965aAfd61217635E5f99f7c1e567978f
```

You may also want to change the list of prefunded accounts in `parity/config/chain.json`.

Add JSON-formatted ethereum accounts to `parity/keys` and they will appear in the UI.

### Access JSON RPC 
Talk to JSON RPC at [http://127.0.0.1:8545](http://127.0.0.1:8545) with your favorite client.


```
curl --data '{"jsonrpc":"2.0","method":"personal_sendTransaction","params":[{"from":"0x6B0c56d1Ad5144b4d37fa6e27DC9afd5C2435c3B","to":"0x00E3d1Aa965aAfd61217635E5f99f7c1e567978f","value":"0xde0b6b3a7640000"}, ""],"id":0}' -H "Content-Type: application/json" -X POST localhost:8545
```

# Identity Api

Please check the readme into the folder "identity-api"

https://docs.google.com/document/d/10JmZcjXEsLTNSwBC9WHQUdZGtLYSHGlQ9LeUp9uh4Ss/edit?usp=sharing

# Blockchain services

This api set gas to the wallet to deploy the contracts.

To run it , please execute npm start 

```
http://localhost:7020/services/security/1.0.0/walletManager/setGasWallet/
```

The request:

```

{
	"requestHeader":{
		"consumerInfo":{
			"id": "id"
		},
		"destinationInfo": {
			"id": "sd",
			"operation": "setGasWallet"
		},
		"requestInfo": {
			"messageId": "qweqe",
			"requestDate": "123qw"
		}
		
	},
	"requestPayload":{
	"serverAddress":"0xe5787915b285b8701c36d4d068e458a28cf10d76",
	"password": "initialvalidator",
	"clientAddress":"0x00bd138abd70e2f00903268f3db08f2d25677c9e"
	}
}
```

Save blockchain data

endpoint:

```
/services/security/1.0.0/walletManager/saveBlockchainData/

```

data that you need on your requestPayload:

protectedData: the cipher data to save (string)
documentNumber: the identification of the user (string)
attributeType: the type of data that you will save (int)

Where the attributeType is:

| 1 |contract|
| 2 |sign certificate|
| 3 |tx gas| 


Validate transaction 

endpoint: 

```
/services/security/1.0.0/walletManager/validateTx/
```

data that you need on your requestPayload:
hash: the hash to validate

