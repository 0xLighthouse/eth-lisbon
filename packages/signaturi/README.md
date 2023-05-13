# Signaturi

Signaturi is a library to support publishing of messages signed by a closed group of EVM accounts and allow for the verification of the authenticity of the message using the signatures.

## Install

```
npm install signaturi
```

Or for `yarn` lovers:

```
yarn add signaturi
```

`signaturi` uses [ethers.js](https://docs.ethers.org/v5/) internally for its signing and verification operations.

## Use

 1. The message publisher collects the *content* and *signers* of the message. Each signer then must sign an EIP-712 typed message:

```javascript
const accounts = [
    {
        "account": "0x18d07e528ad5e863d89affe7f27f861f323a2ec5",
        "name": "Real Faketoshi"
    },
    {
        "account": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
        "name": "Bitconnect"
    },
    {
        "account": "0x0505f6743331f6c47e711516d03a415bbc979133",
        "name": "SBF"
    }
]
const message = {
    content: "New rugpull^H^H^H^H^H^H^Hairdrop!",
    accounts,
};
const encodedMessage = encodeMessage(message)
```

 2. Publisher collects all signatures and calls `createSignaturiMessage`:

```javascript
// message defined on stop 1 above.
const signatures = [
    '0x17de0d62b42d355f097c9865811afa6574e46877ea5f5774b267ace41ee2d9a352743ff67ec92903121eeaf4f4d7d1dd0f87ddeace0a4f8fedb9fbe9bdb1eda31b',
    '0xabc3fbdaa9b2410310a52fef385757fc9b6573d0808a27402373642bde4065f65984fe5bceffdbb5569c516c626381712b8429d01cd680e18c1a9e94dbe021dddd',
    '0x0fb3fbdaa9b2410310a52fefd46e57fc9b6573d0808a27402373642bde4065f65984fe5bceffdbb5569c516c626381712b8429d01cd680e18c1a9e94dbe0219c1c',
]
const signaturiMessage = createSignaturiMessage(message, signatures)
```

 3. Verifier calls `verifySignaturiMessage`:

```javascript
// signaturiMessage defined above on step 2.
const result = verifySignaturiMessage(signaturiMessage)
// {
//     'isValid': false,
//     'message': 'Bad signature #2.',
//     'signatures': [
//         {
//             'result': 'good',
//         },
//         {
//             'result': 'bad',
//         },
//         {
//             'result': 'good',
//         },
//     ]
// }
```


## Publish

* Ensure a local `packages/signaturi/.npmrc` is set up with the correct credentials

```bash
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
@0xLighthouse:registry=https://npm.pkg.github.com
```

```bash
npm publish 
```

