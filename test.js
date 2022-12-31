import base58check from "./base58check.js";

const input = 'hello'

const encoded = await base58check.encode(new TextEncoder().encode(input))

const decoded = await base58check.decode(encoded)

console.log(new TextDecoder().decode(decoded.data) === input);

const encodedHex = await base58check.encodeHex(new TextEncoder().encode(input))
console.log(encoded);
console.log(encodedHex);
const decodedHex = await base58check.decodeHex(encodedHex)
console.log(new TextDecoder().decode(decodedHex.data) === input);