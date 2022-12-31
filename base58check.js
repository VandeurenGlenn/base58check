import base58 from '@vandeurenglenn/base58';
import { createDoubleHash } from '@leofcoin/crypto';
import typedArrayConcat from '@vandeurenglenn/typed-array-concat';

const concatAndDoubleHash = async (input) => {
    return new Uint8Array(await createDoubleHash(typedArrayConcat(input), 'SHA-256'));
};

const encode = async (source, prefix = new TextEncoder().encode('00'), hex) => {
    if (!(source instanceof Uint8Array) || !(prefix instanceof Uint8Array)) {
        throw new TypeError('Expected Uint8Array');
    }
    const hash = await concatAndDoubleHash([
        prefix,
        source
    ]);
    const uint8Array = typedArrayConcat([
        prefix,
        source,
        hash.subarray(0, 4)
    ]);
    if (hex)
        return base58.encodeHex(uint8Array);
    return base58.encode(uint8Array);
};
const decode = async (string, hex) => {
    let uint8Array = hex ? base58.decodeHex(string) : base58.decode(string);
    const prefix = uint8Array.subarray(0, 2);
    const source = uint8Array.subarray(2, -4);
    const hash = await concatAndDoubleHash([
        prefix,
        source
    ]);
    let index = 0;
    const slice = uint8Array.subarray(-4);
    for (const check of slice) {
        if (check !== hash[index]) {
            throw new Error('Invalid checksum');
        }
        index++;
    }
    return { prefix, data: source };
};
const isBase58check = (string, hex) => {
    try {
        hex ? decode(string, true) : decode(string);
        return true;
    }
    catch (e) {
        return false;
    }
};
const encodeHex = (uint8Array, prefix = new TextEncoder().encode('00')) => encode(uint8Array, prefix, true);
const decodeHex = (string) => decode(string, true);
const isBase58checkHex = (string) => isBase58check(string, true);
var base58check = { encode, decode, encodeHex, decodeHex, isBase58check, isBase58checkHex };

export { decode, decodeHex, base58check as default, encode, encodeHex, isBase58check, isBase58checkHex };
