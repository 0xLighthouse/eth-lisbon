import {_TypedDataEncoder as $kJEtJ$_TypedDataEncoder, joinSignature as $kJEtJ$joinSignature, verifyTypedData as $kJEtJ$verifyTypedData} from "ethers/lib/utils";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $c8ca2fa045b820ce$exports = {};

$parcel$export($c8ca2fa045b820ce$exports, "encodeMessage", () => $c8ca2fa045b820ce$export$4dcab8af3e4fe9f);
$parcel$export($c8ca2fa045b820ce$exports, "createSignaturiMessage", () => $c8ca2fa045b820ce$export$ca60467b10700244);

const $ef87c35dbcd87347$export$9b894e906e2387e8 = {
    name: "Signaturi",
    version: "1",
    chainId: 1
};
const $ef87c35dbcd87347$export$fc38c637d0867478 = {
    Message: [
        {
            name: "content",
            type: "string"
        },
        {
            name: "accounts",
            type: "Account[]"
        }
    ],
    Account: [
        {
            name: "name",
            type: "string"
        },
        {
            name: "account",
            type: "address"
        }
    ]
};


function $c8ca2fa045b820ce$export$4dcab8af3e4fe9f(message) {
    return (0, $kJEtJ$_TypedDataEncoder).getPayload((0, $ef87c35dbcd87347$export$9b894e906e2387e8), (0, $ef87c35dbcd87347$export$fc38c637d0867478), message);
}
function $c8ca2fa045b820ce$export$ca60467b10700244(input, signatures) {
    // TODO: sanity checks (throw SignaturiEncodeError)
    // TODO: 1/ same length of signatures and accounts
    // TODO: 2/ at least one non-null signature
    // TODO: 3/ signatures are valid
    // TODO: 4/ signatures match accounts
    // const messageHash = hashMessage(input)
    // Recover the addresses from the signatures
    // const recoveredAddress1 = ethers.utils.recoverAddress(messageHash, await alice.signMessage(DATA));
    // const recoveredAddress2 = ethers.utils.recoverAddress(messageHash, await bob.signMessage(DATA));
    // const recoveredAddress3 = ethers.utils.recoverAddress(messageHash, await charlie.signMessage(DATA));
    // // Check the recovered address against the expected address
    // const isValidSignature = (recoveredAddress1.toLowerCase() === alice.address.toLowerCase() &&
    //       recoveredAddress2.toLowerCase() === bob.address.toLowerCase() &&
    //       recoveredAddress3.toLowerCase() === charlie.address.toLowerCase()
    //                          ) ? true : false
    // serialize all signatures into into string or null
    const serializedSignatures = signatures.map((s)=>{
        if (s === null) return null;
        else if (typeof s !== "string") return (0, $kJEtJ$joinSignature)(s);
        else return s;
    });
    return {
        message: input,
        signatures: serializedSignatures,
        version: "1"
    };
}


var $de8e6a4e16a14510$exports = {};

$parcel$export($de8e6a4e16a14510$exports, "verifySignaturiMessage", () => $de8e6a4e16a14510$export$633ff813c122bf86);


function $de8e6a4e16a14510$var$checkSignature(input, signature, index) {
    if (signature === null) return {
        result: "missing"
    };
    const address = (0, $kJEtJ$verifyTypedData)((0, $ef87c35dbcd87347$export$9b894e906e2387e8), (0, $ef87c35dbcd87347$export$fc38c637d0867478), input, signature);
    const expectedAddress = input.accounts[index].account;
    if (address.toLowerCase() !== expectedAddress.toLowerCase()) return {
        result: "bad",
        error: `Signature #${index + 1} belongs to account ${address} which doesn't match the expected account ${expectedAddress}.`
    };
    // TODO: check each signature matches message
    return {
        result: "good"
    };
}
function $de8e6a4e16a14510$var$calculateValidity(results) {
    let good = 0;
    for(let i = 0; i < results.length; i++){
        const result = results[i];
        if (result.result === "bad") return {
            isValid: false,
            message: result.error ?? "Bad signature #${i+1}"
        };
        else if (result.result === "good") good += 1;
    }
    if (good > 0) return {
        isValid: true,
        message: `Success: ${good} signatures match.`
    };
    else return {
        isValid: false,
        message: `No good signatures found.`
    };
}
function $de8e6a4e16a14510$export$633ff813c122bf86(encodedMessage) {
    const { message: input , signatures: signatures  } = encodedMessage;
    const signatureResults = signatures.map((s, i)=>$de8e6a4e16a14510$var$checkSignature(input, s, i));
    const { isValid: isValid , message: message  } = $de8e6a4e16a14510$var$calculateValidity(signatureResults);
    return {
        isValid: isValid,
        message: message,
        signatures: signatureResults
    };
}




export {$c8ca2fa045b820ce$export$4dcab8af3e4fe9f as encodeMessage, $c8ca2fa045b820ce$export$ca60467b10700244 as createSignaturiMessage, $de8e6a4e16a14510$export$633ff813c122bf86 as verifySignaturiMessage};
//# sourceMappingURL=module.js.map
