import base58 from '@vandeurenglenn/base58';
import { createHash } from '@leofcoin/crypto';

const encode = async (source, prefix = new TextEncoder().encode('00')) => {
    if (!(source instanceof Uint8Array) || !(prefix instanceof Uint8Array)) {
        throw new TypeError('Expected Uint8Array');
    }
    let uint8Array = new Uint8Array(prefix.length + source.length);
    uint8Array.set(prefix);
    uint8Array.set(source, prefix.length);
    let hash = await createHash(uint8Array, 'SHA-256');
    hash = await createHash(new Uint8Array(hash), 'SHA-256');
    const slice = new Uint8Array(hash).subarray(0, 4);
    uint8Array = new Uint8Array(prefix.length + source.length + slice.length);
    uint8Array.set(prefix);
    uint8Array.set(source, prefix.length);
    uint8Array.set(slice, source.length + prefix.length);
    return base58.encode(uint8Array);
};
const decode = async (string) => {
    let uint8Array = base58.decode(string);
    const prefix = uint8Array.subarray(0, 2);
    const source = uint8Array.subarray(2, -4);
    let hash = new Uint8Array(prefix.length + source.length);
    hash.set(prefix);
    hash.set(source, prefix.length);
    hash = new Uint8Array(await createHash(hash, 'SHA-256'));
    hash = new Uint8Array(await createHash(hash, 'SHA-256'));
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
const isBase58check = (string) => {
    try {
        decode(string);
        return true;
    }
    catch (e) {
        return false;
    }
};
var base58check = { encode, decode, isBase58check };

export { decode, base58check as default, encode, isBase58check };
