# base58check
 
## install
```sh
npm i @vandeurenglenn/base58check
```

## usage
```js
import base58check from '@vandeurenglenn/base58check'

const data = new TextEncoder().encode('hello')
const prefix = new TextEncoder().encode('00')

const encoded = base58check.encode(data, prefix) 
console.log(encoded)// Cx5k9JXcyQKnF8j

const decoded = base58check.decode(encoded) 
console.log(decoded) // { prefix: Uint8Array(2) [ 48, 48 ],  data: Uint8Array(5) [ 104, 101, 108, 108, 111 ] }

console.log(new TextDecoder().decode(decoded.data)) // 'hello'
console.log(new TextDecoder().decode(decoded.prefix)) // '00'
```