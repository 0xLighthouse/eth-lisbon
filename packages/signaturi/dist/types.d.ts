import { Signature } from "ethers";
interface Account {
    name: string;
    account: string;
}
interface EncodedMessage {
    message: InputMessage;
    signatures: Array<string | null>;
    version: '1';
}
interface InputMessage {
    content: string;
    accounts: Account[];
}
interface Result {
    isValid: boolean;
    message: string;
    signatures: SignatureResult[];
}
interface SignatureResult {
    result: 'good' | 'bad' | 'missing';
}
export function encodeMessage(message: InputMessage): any;
export function createSignaturiMessage(input: InputMessage, signatures: Array<Signature | string | null>): EncodedMessage;
export function verifySignaturiMessage(encodedMessage: EncodedMessage): Result;

//# sourceMappingURL=types.d.ts.map
