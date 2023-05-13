import { Signature } from "ethers";
import { joinSignature, _TypedDataEncoder } from "ethers/lib/utils.js";
import { EIP712_DOMAIN, EIP712_TYPES } from "./constants";
import { EncodedMessage, InputMessage } from "./types";

/**
   Encode a Signaturi-compatible message into an EIP-712 accounts to sign.

   Docs:
   https://eips.ethereum.org/EIPS/eip-712
   https://docs.ethers.org/v5/api/utils/hashing/#TypedDataEncoder
   **/
export function encodeMessage(message: InputMessage) {
    const eip712Message = _TypedDataEncoder.encode(
        EIP712_DOMAIN, EIP712_TYPES, message
    )
    return eip712Message
}

/// Creates a signaturi message that can be later verified for authenticity
export function createSignaturiMessage(
    input: InputMessage, signatures: Array<Signature | string | null>
): EncodedMessage {
    // TODO: sanity checks (throw SignaturiEncodeError)
    // TODO: 1/ same length of signatures and accounts
    // TODO: 2/ at least one non-null signature
    // TODO: 3/ signatures are valid
    // TODO: 4/ signatures match accounts
    // const messageHash = hashMessage(input)
    // Recover the addresses from the signatures
    // const recoveredAddress1 = ethers.utils.recoverAddress(messageHash, await alice.signMessage(DATA));
    // const recoveredAddress2 = ethers.utils.recoverAddress(messageHash, await bob.signMessage(DATA));
    // const recoveredAddress3 = ethers.utils.recoverAddress(messageHash, await charlie.signMessage(DATA));
    // // Check the recovered address against the expected address
    // const isValidSignature = (recoveredAddress1.toLowerCase() === alice.address.toLowerCase() &&
    //       recoveredAddress2.toLowerCase() === bob.address.toLowerCase() &&
    //       recoveredAddress3.toLowerCase() === charlie.address.toLowerCase()
    //                          ) ? true : false

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
    }
}
