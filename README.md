# ETHGlobal Lisbon 2023: Signaturi

The project has two separate parts, included in this monorepo for convenience:

1. [Signaturi library](./packages/signaturi/): NPM package, fully typed with Typescript and full unit-test coverage.

2. [Next.js web app](./packages/nextjs/): an example platform that implements the Signaturi protocol to create messages, allow signers to sign them and anyone to verify the announcements.

## Project abstract

The Signaturi project was born after seeing Web3 and crypto projects getting their social accounts hacked to post malicious links. One such example was [BAYC getting their Instagram account hacked](https://twitter.com/BoredApeYC/status/1518637579633053701), leading to some users getting their wallets drained off to an estimated $2.8M.

There must be a better way to do public announcements that can be verified and trusted by their communities. We propose the Signaturi protocol to reduce the chances for an attacker to impersonate legitimate accounts.

The Signaturi protocol follows these steps:
1. The publisher chooses a closed list of possible signers (EVM accounts) and sends them the message to be signed.
2. Each signer reviews and signs the message, which includes the list of all possible signers. The Signaturi platform automatically collects the signatures.
3. The publisher reviews the content and signatures, and publishes the message.
4. Anyone can check the validity of the message by checking all provided signatures.

Following this protocol, an attacker would need to hack multiple wallets in order to create a fake announcement, which should reduce this attack vector substantially.

Signers can use any supported wallet, including hardware or multisig wallets.

## Future and possible improvements

This submission is obviously a proof of concept, but the team had many ideas for future improvements:
- Allow signers to reject or abstain, not just approve the message.
- Have a registry of project participants for end users to pull keys and roles of accounts associated to the project.
- Flexible per-project configuration on what and how many signatures are required for a message to be considered valid. Things like minimum number of signatures or requiring some accounts to always provide a signature.
- ENS lookup of accounts.
- A way to visualize org structure/permissions.
- Aggregate signatures using BLS.
- Use some commit/reveal scheme to create and publish announcements that can only be decrypted at a set date in the future.

## Scaffold-ETH 2

This project was bootstrapped using [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth), check it out for a great way to get your new Web3 project quickly and up running!
