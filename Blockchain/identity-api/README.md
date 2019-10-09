# Colombia ID API

## Instalación
```bash
$ npm install
$ npm start
```

## Deploy de identidad
Ejecuten la siguiente llamada HTTP para obtener una transacción lista para firmar para el deploy de identidad
```
url: http://[HOST]/identity/deploy
type: PUT
headers: {
  Content-Type: application/x-www-form-urlencoded,
  from: [Ethereum address to deploy with]
}
body: {}
```

Ésta devuelve una respuesta similar a  
```javascript
{
    "success": true,
    "transaction": {
        "from": "0xbf5b94b96348d76f57aa095af96a69d4068e5456",
        "data": "0x60...0029",
        "nonce": "0x1",
        "gas": "0x382d7a"
    }
}
```

Dentro del archivo `sign.js` actualicen la variable `rawTx` con la transacción devuelta

```javascript
let rawTx = {
  "from": "",
  "data": ""
  "nonce": "",
  "gas": ""
}
```

Ejecuten el archivo para obtener la transacción firmada
```bash
$ node sign.js
```
Para ejecutar el deploy ejecutamos la siguiente HTTP

```
HTTP:
url: http://[HOST]/identity/deploy
type: POST
headers: {
  Content-Type: application/x-www-form-urlencoded,
  from: [Ethereum address to deploy with]
}
body: {
  signed: 0x03...abf4
}

```

La llamada devolverá la dirección de la identidad:
```javascript
{
    "success": true,
    "address": "0xaA6268C49b3Cf40535E328DBEe956065620a94cF"
}
```

## Llamadas
Se pueden llamar a todos los métodos de una identidad una vez corrido el deploy. Los métodos son los listados por el propio contrato:
- getKey
- keyHasPurpose
- getKeysByPurpose
- getKeyType
- getKeysByType
- addKey
- removeKey
- execute
- approve
- addClaim
- changeClaim
- removeClaim
- getClaim
- getClaimIdsByTopic
- transferOwnership

Un ejemplo para el método addKey sería

```
HTTP:
url: http://[HOST]/identity/[ADDRESS]/addKey
type: PUT
headers: {
  Content-Type: application/x-www-form-urlencoded,
  from: [Ethereum address to deploy with]
}
body: {
  key: 0x0a...b5fe
  purpose: 1,
  keyType: 1
}
```
Igual que en el deploy, la api nos devuelve la transacción armada y lista para firmar con `sign.js`:
```javascript
{
    "success": true,
    "transaction": {
        "from": "0xbf5b94b96348d76f57aa095af96a69d4068e5456",
        "to": "0xaa6268c49b3cf40535e328dbee956065620a94cf",
        "data": "0x1d3812403a1076bf45ab87712ad64ccb3b10217737f7faacbf2872e88fdd9a537d8fe26600000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001",
        "nonce": "0x1",
        "gas": 138285
    }
}
```

Una vez firmada con `sign.js` llamaremos a la api para propagar la llamada al blockchain

```
HTTP:
url: http://[HOST]/identity/[ADDRESS]/addKey
type: POST
headers: {
  Content-Type: application/x-www-form-urlencoded,
  from: [Ethereum address to deploy with]
}
body: {
  signed: 0x0a...b5fe
}
```
