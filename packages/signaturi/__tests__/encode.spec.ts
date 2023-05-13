import { ACCOUNT1, ACCOUNT2, ACCOUNT3, CONTENT } from "./helper"
import {
    createSignaturiMessage,
    encodeMessage,
    SignaturiLengthMismatchError,
    SignaturiNoAccountsError,
    SignaturiNoContentError,
    SignaturiNoSignaturesError,
} from "../src/encode"

describe('encodeMessage', () => {

    it('generates EIP-712 typed payload', async () => {
        const encodedMessage = encodeMessage({
            content: CONTENT,
            accounts: [
                ACCOUNT1,
                ACCOUNT2,
                ACCOUNT3,
            ],
        });
        expect(encodedMessage).toStrictEqual({
            "domain": {
                "chainId": "1",
                "name": "Signaturi",
                "version": "1"
            },
            "message": {
                "accounts": [
                    {
                        "account": "0x18d07e528ad5e863d89affe7f27f861f323a2ec5",
                        "name": "Signaturi Test Account"
                    },
                    {
                        "account": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
                        "name": "vitalik.eth"
                    },
                    {
                        "account": "0x0505f6743331f6c47e711516d03a415bbc979133",
                        "name": ""
                    }
                ],
                "content": "Verified by Signaturi"
            },
            "primaryType": "Message",
            "types": {
                "Account": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "account",
                        "type": "address"
                    }
                ],
                "EIP712Domain": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "version",
                        "type": "string"
                    },
                    {
                        "name": "chainId",
                        "type": "uint256"
                    }
                ],
                "Message": [
                    {
                        "name": "content",
                        "type": "string"
                    },
                    {
                        "name": "accounts",
                        "type": "Account[]"
                    }
                ]
            }
        })
    })

    // TODO: test error if invalid account
})

describe('createSignaturiMessage', () => {
    it('creates a valid Signaturi message if all checks pass', async () => {
        const signaturiMessage = createSignaturiMessage(
            {
                content: CONTENT,
                accounts: [
                    ACCOUNT1,
                    ACCOUNT2,
                    ACCOUNT3,
                ],
            },
            [
                '0x17de0d62b42d355f097c9865811afa6574e46877ea5f5774b267ace41ee2d9a352743ff67ec92903121eeaf4f4d7d1dd0f87ddeace0a4f8fedb9fbe9bdb1eda31b',
                null,
                '0x0fb3fbdaa9b2410310a52fefd46e57fc9b6573d0808a27402373642bde4065f65984fe5bceffdbb5569c516c626381712b8429d01cd680e18c1a9e94dbe0219c1c',
            ],
        )
        expect(signaturiMessage).toStrictEqual({
            message: {
                'accounts': [
                    {
                        'account': '0x18d07e528Ad5E863d89afFe7f27f861F323a2eC5',
                        'name': 'Signaturi Test Account',
                    },
                    {
                        'account': '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
                        'name': 'vitalik.eth',
                    },
                    {
                        'account': '0x0505f6743331f6c47e711516d03a415bbc979133',
                        'name': '',
                    }
                ],
                'content': 'Verified by Signaturi',
            },
            signatures: [
                '0x17de0d62b42d355f097c9865811afa6574e46877ea5f5774b267ace41ee2d9a352743ff67ec92903121eeaf4f4d7d1dd0f87ddeace0a4f8fedb9fbe9bdb1eda31b',
                null,
                '0x0fb3fbdaa9b2410310a52fefd46e57fc9b6573d0808a27402373642bde4065f65984fe5bceffdbb5569c516c626381712b8429d01cd680e18c1a9e94dbe0219c1c',
            ],
            version: '1',
        })
    })

    it('error if no accounts', async () => {
        expect(() => createSignaturiMessage(
           {
               content: CONTENT,
               accounts: [],
           },
           [
               '0x17de0d62b42d355f097c9865811afa6574e46877ea5f5774b267ace41ee2d9a352743ff67ec92903121eeaf4f4d7d1dd0f87ddeace0a4f8fedb9fbe9bdb1eda31b',
               null,
                '0x0fb3fbdaa9b2410310a52fefd46e57fc9b6573d0808a27402373642bde4065f65984fe5bceffdbb5569c516c626381712b8429d01cd680e18c1a9e94dbe0219c1c',
           ],
        )).toThrow(new SignaturiNoAccountsError('Must provide at least one account.'))
    })

    it('error if no content', async () => {
        expect(() => createSignaturiMessage(
           {
               content: '',
               accounts: [
                    ACCOUNT1,
                    ACCOUNT2,
                    ACCOUNT3,
               ],
           },
           [
               '0x17de0d62b42d355f097c9865811afa6574e46877ea5f5774b267ace41ee2d9a352743ff67ec92903121eeaf4f4d7d1dd0f87ddeace0a4f8fedb9fbe9bdb1eda31b',
               null,
                '0x0fb3fbdaa9b2410310a52fefd46e57fc9b6573d0808a27402373642bde4065f65984fe5bceffdbb5569c516c626381712b8429d01cd680e18c1a9e94dbe0219c1c',
           ],
        )).toThrow(new SignaturiNoContentError('Must provide some content.'))
    })

    it('error if no signatures', async () => {
        expect(() => createSignaturiMessage(
           {
               content: CONTENT,
               accounts: [
                   ACCOUNT1,
                   ACCOUNT2,
                   ACCOUNT3,
               ],
           },
           [],
        )).toThrow(new SignaturiNoSignaturesError('Must provide signatures.'))
    })

    it('error if fewer signatures than accounts', async () => {
        expect(() => createSignaturiMessage(
           {
               content: CONTENT,
               accounts: [
                   ACCOUNT1,
                   ACCOUNT2,
                   ACCOUNT3,
               ],
           },
           [
               '0x17de0d62b42d355f097c9865811afa6574e46877ea5f5774b267ace41ee2d9a352743ff67ec92903121eeaf4f4d7d1dd0f87ddeace0a4f8fedb9fbe9bdb1eda31b',
           ],
        )).toThrow(new SignaturiLengthMismatchError('Number of signatures does not match number of accounts.'))
    })

    it('error if more signatures than accounts', async () => {
        expect(() => createSignaturiMessage(
           {
               content: CONTENT,
               accounts: [
                   ACCOUNT1,
                   ACCOUNT3,
               ],
           },
           [
               '0x17de0d62b42d355f097c9865811afa6574e46877ea5f5774b267ace41ee2d9a352743ff67ec92903121eeaf4f4d7d1dd0f87ddeace0a4f8fedb9fbe9bdb1eda31b',
               null,
                '0x0fb3fbdaa9b2410310a52fefd46e57fc9b6573d0808a27402373642bde4065f65984fe5bceffdbb5569c516c626381712b8429d01cd680e18c1a9e94dbe0219c1c',
           ],
        )).toThrow(new SignaturiLengthMismatchError('Number of signatures does not match number of accounts.'))
    })
})
