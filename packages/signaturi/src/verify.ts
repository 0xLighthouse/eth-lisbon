import { EncodedMessage, Result } from "./types"

export function verifySignaturiMessage(encodedMessage: EncodedMessage): Result {
    const { message, signatures } = encodedMessage
    // TODO: check all signatures

    // TODO: calculate valid

    return {
        valid: true,
        signatures: signatures.map(_ => ({ result: 'good' })),
    }
}
