import { EncodedMessage, InputMessage, Result, SignatureResult } from "./types"

function checkSignature(input: InputMessage, signature: string | null): SignatureResult {
    if (signature === null) {
        return { result: 'missing' }
    }
    // TODO: check each signature matches account
    // TODO: check each signature matches message
    return { result: 'good' }
}

function calculateValidity(results: SignatureResult[]): { isValid: boolean, message: string } {
    let good = 0
    for (const result of results) {
        if (result.result === 'bad') {
            return {
                isValid: false,
                message: result.error ?? 'Bad signature',
            }
        } else if (result.result === 'good') {
            good += 1
        }
    }
    if (good > 0) {
        return {
            isValid: true,
            message: `Success: ${good} signatures match.`,
        }
    } else {
        return {
            isValid: false,
            message: `No good signatures found.`,
        }
    }
}

export function verifySignaturiMessage(encodedMessage: EncodedMessage): Result {
    const { message: input, signatures } = encodedMessage
    const signatureResults = signatures.map(s => checkSignature(input, s))
    const { isValid, message } = calculateValidity(signatureResults)
    return {
        isValid,
        message,
        signatures: signatureResults,
    }
}
