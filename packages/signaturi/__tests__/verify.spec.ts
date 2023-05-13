import { ACCOUNT1, ACCOUNT2, ACCOUNT3, CONTENT } from "./helper"
import { verifySignaturiMessage } from "../src/verify"

describe('verifySignaturiMessage', () => {
    it('valid result if all signatures are good', async () => {
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
        })
        expect(result).toStrictEqual({
            'signatures': [
                {
                    'result': 'good',
                },
                {
                    'result': 'good',
                },
                {
                    'result': 'good',
                },
            ],
            'valid': true,
        })
    })

    // TODO: test mix of good, bad and missing signatures
    // TODO: test all bad signatures
    // TODO: test all missing signatures
})
