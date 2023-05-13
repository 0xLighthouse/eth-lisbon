/// EVM account
export interface Account {
    /// Human-readable name associated to the account (e.g. person name, ENS,
    /// organization role...)
    name: string,
    /// EVM address that will be used for signing
    account: string,
}

export interface EncodedMessage {
    message: InputMessage,
    /// signatures must match InputMessage.accounts 1:1, same length and order
    signatures: Array<string | null>,
    version: '1',
}

/// Structure that will be signed with EIP-712.
///
/// Must be typed as defined in EIP712_TYPES constant.
export interface InputMessage {
    /// User-facing message that signers are signing authenticity of
    content: string,
    /// EVM accounts that are eligible to
    accounts: Account[],
}

export interface Result {
    valid: boolean,
    // signature results will match EncodedMessage.signatures 1:1
    signatures: SignatureResult[],
}

export interface SignatureResult {
    result: 'good' | 'bad' | 'missing'
    error?: string,
}
