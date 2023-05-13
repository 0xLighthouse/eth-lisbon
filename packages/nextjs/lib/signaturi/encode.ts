import { Signature } from "ethers";
import { joinSignature, _TypedDataEncoder } from "ethers/lib/utils";
import { EIP712_DOMAIN, EIP712_TYPES } from "./constants";
import { EncodedMessage, InputMessage, SignaturiError } from "./types";

export class SignaturiNoAccountsError extends SignaturiError {}
export class SignaturiNoContentError extends SignaturiError {}
export class SignaturiNoSignaturesError extends SignaturiError {}
export class SignaturiLengthMismatchError extends SignaturiError {}

function checkInput(input: InputMessage) {
    if (!input || !input.content) {
        throw new SignaturiNoContentError('Must provide some content.')
    }
    if (!input.accounts || input.accounts.length === 0 ) {
        throw new SignaturiNoAccountsError('Must provide at least one account.')
    }
}

function checkSignatures(signatures: unknown[]) {
    if (!signatures || signatures.length === 0 ) {
        throw new SignaturiNoSignaturesError('Must provide signatures.')
    }
}

/**
   Encode a Signaturi-compatible message into an EIP-712 accounts to sign.

   Docs:
   https://eips.ethereum.org/EIPS/eip-712
   https://docs.ethers.org/v5/api/utils/hashing/#TypedDataEncoder
   **/
export function encodeMessage(input: InputMessage) {
    checkInput(input)
    return _TypedDataEncoder.getPayload(EIP712_DOMAIN, EIP712_TYPES, input)
}

/// Creates a signaturi message that can be later verified for authenticity
export function createSignaturiMessage(
    input: InputMessage, signatures: Array<Signature | string | null>
): EncodedMessage {
    checkInput(input)
    checkSignatures(signatures)
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
