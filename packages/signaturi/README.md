# Signaturi

Signaturi is a library to support publishing of messages signed by a closed group of EVM accounts and allow for the verification of the authenticity of the message using the signatures.

## Install

```
npm install signaturi
```

Or for *yarn* lovers:

```
yarn add signaturi
```

*signaturi* uses [ethers.js](https://docs.ethers.org/v5/) internally for its signing and verification operations.

## Use

1. The message creator collects the *content* and *authors* of the message. Each signing author then must sign an EIP-712 typed message:
```javascript
// TODO
```

2. Creator collects all signatures and calls `createSignaturiMessage`:
```javascript
// TODO
```

3. Verifier calls `verifySignaturiMessage`:
```javascript
// TODO
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
