import { hello } from "../src/hello"
import { Wallet, ethers } from 'ethers'

const DATA = "Hello, world!"

describe('how signing works', () => {

    it('message ', async () => {
        const alice = Wallet.createRandom()
        const bob = Wallet.createRandom()
        const charlie = Wallet.createRandom()

        const messageHash = ethers.utils.hashMessage(DATA);

        // Recover the addresses from the signatures
        const recoveredAddress1 = ethers.utils.recoverAddress(messageHash, await alice.signMessage(DATA));
        const recoveredAddress2 = ethers.utils.recoverAddress(messageHash, await bob.signMessage(DATA));
        const recoveredAddress3 = ethers.utils.recoverAddress(messageHash, await charlie.signMessage(DATA));

        // Check the recovered address against the expected address
        const isValidSignature = (recoveredAddress1.toLowerCase() === alice.address.toLowerCase() &&
            recoveredAddress2.toLowerCase() === bob.address.toLowerCase() &&
            recoveredAddress3.toLowerCase() === charlie.address.toLowerCase()
        ) ? true : false

        expect(isValidSignature).toBe(true)
    })

})
