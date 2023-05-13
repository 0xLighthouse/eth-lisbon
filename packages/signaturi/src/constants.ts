export const EIP712_DOMAIN = {
    name: 'Signaturi',
    version: '1',
    chainId: 1,
//    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
}

export const EIP712_TYPES = {
    Message : [
        { name: 'content', type: 'string' },
        { name: 'accounts', type: 'Account[]' },
    ],
    Account: [
        { name: 'name', type: 'string' },
        { name: 'account', type: 'address' }
    ],
}
