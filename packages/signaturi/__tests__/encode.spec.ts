import { createSignaturiMessage, encodeMessage } from "../src/encode"
import { Wallet } from 'ethers'

const CONTENT = "Verified by Signaturi"
// yard system super clock quick vacant mistake clog grocery doll case aerobic
const ACCOUNT1 = {
    name: 'Signaturi Test Account',
    account: '0x18d07e528Ad5E863d89afFe7f27f861F323a2eC5',
}
// no private keys for this one!
const ACCOUNT2 = {
    name: 'vitalik.eth',
    account: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
}
// journey another slam hill mimic lab soon forward valve local zone tool
const ACCOUNT3 = {
    name: '',
    account: '0x0505f6743331f6c47e711516d03a415bbc979133',
}

describe('encodeMessage', () => {

    it('generates EIP-712 typed message', async () => {
        const encodedMessage = encodeMessage({
            content: CONTENT,
            accounts: [
                ACCOUNT1,
                ACCOUNT2,
                ACCOUNT3,
            ],
        });
        expect(encodedMessage).toBe('0x1901e70e8637f1a9bde79d7906a4afadf82fecff057d2a8e786ef833e156c62358a063374558d416fb445b7c0cf678ee7066616dd1b9c7a96ff50f5b0b46ec2db017')
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
                '0xa97b7f3bc17d3762d1c802042f3d18cbc7f835949c34b310429d186959a496086a38dacdb59d5b0e5e25481013778cc584d0526b587d72f2ed7d511d8669ca171c',
                null,
                '0xe04397f010a6f8c53987d22693b2ba56432f337f12239aa798b12c760e8276c94d8e2e0870b562c041627a5814c0f086239f34e8e099ce1a763afeb60dc74d1d1c',
            ],
        )
        expect(signaturiMessage).toStrictEqual({
            'message': {
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
            'signatures': [
                '0xa97b7f3bc17d3762d1c802042f3d18cbc7f835949c34b310429d186959a496086a38dacdb59d5b0e5e25481013778cc584d0526b587d72f2ed7d511d8669ca171c',
                null,
                '0xe04397f010a6f8c53987d22693b2ba56432f337f12239aa798b12c760e8276c94d8e2e0870b562c041627a5814c0f086239f34e8e099ce1a763afeb60dc74d1d1c',
            ],
        })
    })

    // TODO: test error scenarios 
})

