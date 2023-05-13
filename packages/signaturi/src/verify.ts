import { verifyTypedData } from "ethers/lib/utils"
import { EIP712_DOMAIN, EIP712_TYPES } from "./constants"
import { EncodedMessage, InputMessage, Result, SignatureResult } from "./types"

function checkSignature(
    input: InputMessage, signature: string | null, index: number
): SignatureResult {
    if (signature === null) {
        return { result: 'missing' }
    }
    const address = verifyTypedData(EIP712_DOMAIN, EIP712_TYPES, input, signature)
    const expectedAddress = input.accounts[index].account
    if (address.toLowerCase() !== expectedAddress.toLowerCase()) {
        return { result: 'bad' }
    }
    return { result: 'good' }
}

function calculateValidity(results: SignatureResult[]): { isValid: boolean, message: string } {
    let good = 0
    for (let i = 0; i < results.length; i++) {
        const result = results[i]
        if (result.result === 'bad') {
            return {
                isValid: false,
                message: `Bad signature #${i+1}.`,
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
    const signatureResults = signatures.map((s, i) => checkSignature(input, s, i))
    const { isValid, message } = calculateValidity(signatureResults)
    return {
        isValid,
        message,
        signatures: signatureResults,
    }
}
