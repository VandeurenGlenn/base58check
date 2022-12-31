declare module base58check {
  export function encode(source: Uint8Array | ArrayBuffer, prefix: Uint8Array | ArrayBuffer, hex?: boolean):Promise<base58String>
  export function decode(string: base58String, hex?: boolean):Uint8Array
  export function isBase58check(string: base58String, hex?: boolean): boolean
  export function encodeHex(source: Uint8Array | ArrayBuffer, prefix: Uint8Array | ArrayBuffer):Promise<base58String>
  export function decodeHex(string: base58String):Uint8Array
  export function isBase58checkHex(string: base58HexString): boolean
}

declare module '@vandeurenglenn/base58check' {
  export default base58check
}