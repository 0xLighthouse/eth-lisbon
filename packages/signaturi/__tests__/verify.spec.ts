import { ACCOUNT1, ACCOUNT2, ACCOUNT3, CONTENT } from "./helper"
import { verifySignaturiMessage } from "../src/verify"

describe('verifySignaturiMessage', () => {
    const message = {
        content: CONTENT,
        accounts: [
            ACCOUNT1,
            ACCOUNT2,
            ACCOUNT3,
        ],
    }

    it('valid result if at least one good signature and no bad ones', async () => {
        const result = verifySignaturiMessage({
            message,
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
            message,
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

    it('invalid result if there is one bad signature from a good address but bad signed content', async () => {
        const result = verifySignaturiMessage({
            message,
            signatures: [
                '0x17de0d62b42d355f097c9865811afa6574e46877ea5f5774b267ace41ee2d9a352743ff67ec92903121eeaf4f4d7d1dd0f87ddeace0a4f8fedb9fbe9bdb1eda31b',
                null,
                '0x73f6dc9046f4303af5a831b37a4d6f9270867c5088a53c45748245ec4976926a62fa4830f8571349b200cc7c68cbc249fb7dc1d0580f6237c9c54060f75246e41b',
            ],
            version: '1',
        })
        expect(result).toStrictEqual({
            'isValid': false,
            'message': 'Bad signature #3.',
            'signatures': [
                {
                    'result': 'good',
                },
                {
                    'result': 'missing',
                },
                {
                    'result': 'bad',
                },
            ],
        })
    })

    it('invalid result if there is one bad signature from different address', async () => {
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
            'message': 'Bad signature #2.',
            'signatures': [
                {
                    'result': 'good',
                },
                {
                    'result': 'bad',
                },
                {
                    'result': 'good',
                },
            ],
        })
    })
})
