import base58check from "./base58check.js";

const input = 'hello'

const encoded = await base58check.encode(new TextEncoder().encode(input))

const decoded = await base58check.decode(encoded)
console.log(new TextDecoder().decode(decoded.data) === input);
