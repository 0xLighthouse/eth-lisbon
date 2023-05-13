import { ACCOUNT1, ACCOUNT2, ACCOUNT3, CONTENT } from "./helper"
import { verifySignaturiMessage } from "../src/verify"

describe('verifySignaturiMessage', () => {
    it('valid result if at least one good signature and no bad ones', async () => {
        const result = verifySignaturiMessage({
            message: {
                content: CONTENT,
                accounts: [
                    ACCOUNT1,
                    ACCOUNT2,
                    ACCOUNT3,
                ],
            },
            signatures: [
                '0x17de0d62b42d355f097c9865811afa6574e46877ea5f5774b267ace41ee2d9a352743ff67ec92903121eeaf4f4d7d1dd0f87ddeace0a4f8fedb9fbe9bdb1eda31b',
                null,
                '0x0fb3fbdaa9b2410310a52fefd46e57fc9b6573d0808a27402373642bde4065f65984fe5bceffdbb5569c516c626381712b8429d01cd680e18c1a9e94dbe0219c1c',
            ],
            version: '1',
        })
        expect(result).toStrictEqual({
            'isValid': true,
            'message': 'Success: 2 signatures match.',
            'signatures': [
                {
                    'result': 'good',
                },
                {
                    'result': 'missing',
                },
                {
                    'result': 'good',
                },
            ],
        })
    })

    it('valid result if at least one good signature and no bad ones', async () => {
        const result = verifySignaturiMessage({
            message: {
                content: CONTENT,
                accounts: [
                    ACCOUNT1,
                    ACCOUNT2,
                    ACCOUNT3,
                ],
            },
            signatures: [
                '0x17de0d62b42d355f097c9865811afa6574e46877ea5f5774b267ace41ee2d9a352743ff67ec92903121eeaf4f4d7d1dd0f87ddeace0a4f8fedb9fbe9bdb1eda31b',
                null,
                '0x0fb3fbdaa9b2410310a52fefd46e57fc9b6573d0808a27402373642bde4065f65984fe5bceffdbb5569c516c626381712b8429d01cd680e18c1a9e94dbe0219c1c',
            ],
            version: '1',
        })
        expect(result).toStrictEqual({
            'isValid': true,
            'message': 'Success: 2 signatures match.',
            'signatures': [
                {
                    'result': 'good',
                },
                {
                    'result': 'missing',
                },
                {
                    'result': 'good',
                },
            ],
        })
    })

    it('invalid result if all signatures are missing', async () => {
        const result = verifySignaturiMessage({
            message: {
                content: CONTENT,
                accounts: [
                    ACCOUNT1,
                    ACCOUNT2,
                    ACCOUNT3,
                ],
            },
            signatures: [
                null,
                null,
                null,
            ],
            version: '1',
        })
        expect(result).toStrictEqual({
            'isValid': false,
            'message': 'No good signatures found.',
            'signatures': [
                {
                    'result': 'missing',
                },
                {
                    'result': 'missing',
                },
                {
                    'result': 'missing',
                },
            ],
        })
    })

    it('invalid result if there is one bad signature', async () => {
        const result = verifySignaturiMessage({
            message: {
                content: CONTENT,
                accounts: [
                    ACCOUNT1,
                    ACCOUNT2,
                    ACCOUNT3,
                ],
            },
            signatures: [
                '0x17de0d62b42d355f097c9865811afa6574e46877ea5f5774b267ace41ee2d9a352743ff67ec92903121eeaf4f4d7d1dd0f87ddeace0a4f8fedb9fbe9bdb1eda31b',
                '0x0fb3fbdaa9b2410310a52fefd46e57fc9b6573d0808a27402373642bde4065f65984fe5bceffdbb5569c516c626381712b8429d01cd680e18c1a9e94dbe0219c1b',
                '0x0fb3fbdaa9b2410310a52fefd46e57fc9b6573d0808a27402373642bde4065f65984fe5bceffdbb5569c516c626381712b8429d01cd680e18c1a9e94dbe0219c1c',
            ],
            version: '1',
        })
        expect(result).toStrictEqual({
            'isValid': false,
            'message': 'Signature #2 belongs to account 0xa3D715e6b0dDE076491681e26f2329505633B7a2 which doesn\'t match the expected account 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045.',
            'signatures': [
                {
                    'result': 'good',
                },
                {
                    'result': 'bad',
                    'error': 'Signature #2 belongs to account 0xa3D715e6b0dDE076491681e26f2329505633B7a2 which doesn\'t match the expected account 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045.',
                },
                {
                    'result': 'good',
                },
            ],
        })
    })

    // TODO: test all bad signatures
})
