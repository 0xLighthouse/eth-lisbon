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
                '0xa97b7f3bc17d3762d1c802042f3d18cbc7f835949c34b310429d186959a496086a38dacdb59d5b0e5e25481013778cc584d0526b587d72f2ed7d511d8669ca171c',
                null,
                '0xe04397f010a6f8c53987d22693b2ba56432f337f12239aa798b12c760e8276c94d8e2e0870b562c041627a5814c0f086239f34e8e099ce1a763afeb60dc74d1d1c',
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

    // TODO: test mix of good, bad and missing signatures
    // TODO: test all bad signatures
})
