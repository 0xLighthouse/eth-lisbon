import { Signature } from "ethers";
import { joinSignature, _TypedDataEncoder } from "ethers/lib/utils";
import { EIP712_DOMAIN, EIP712_TYPES } from "./constants";
import { EncodedMessage, InputMessage } from "./types";

export class SignaturiLengthMismatchError extends Error {}

/**
   Encode a Signaturi-compatible message into an EIP-712 accounts to sign.

   Docs:
   https://eips.ethereum.org/EIPS/eip-712
   https://docs.ethers.org/v5/api/utils/hashing/#TypedDataEncoder
   **/
export function encodeMessage(message: InputMessage) {
    return _TypedDataEncoder.getPayload(EIP712_DOMAIN, EIP712_TYPES, message)
}

/// Creates a signaturi message that can be later verified for authenticity
export function createSignaturiMessage(
    input: InputMessage, signatures: Array<Signature | string | null>
): EncodedMessage {
    if (input.accounts.length !== signatures.length) {
        throw new SignaturiLengthMismatchError('Number of signatures does not match number of accounts.')
    }

    // serialize all signatures into into string or null
    const serializedSignatures = signatures.map(
        s => {
            if (s === null) return null
            else if (typeof s !== 'string') return joinSignature(s)
            else return s
        }
    )

    return {
        message: input,
        signatures: serializedSignatures,
        version: '1',
    }
}
