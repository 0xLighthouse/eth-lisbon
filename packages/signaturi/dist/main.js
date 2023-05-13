var $k3fDw$etherslibutils = require("ethers/lib/utils");

function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $187217d9eb326259$exports = {};

$parcel$export($187217d9eb326259$exports, "encodeMessage", () => $187217d9eb326259$export$4dcab8af3e4fe9f);
$parcel$export($187217d9eb326259$exports, "createSignaturiMessage", () => $187217d9eb326259$export$ca60467b10700244);

const $a31e9366eb776d45$export$9b894e906e2387e8 = {
    name: "Signaturi",
    version: "1",
    chainId: 1
};
const $a31e9366eb776d45$export$fc38c637d0867478 = {
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


function $187217d9eb326259$export$4dcab8af3e4fe9f(message) {
    return (0, $k3fDw$etherslibutils._TypedDataEncoder).getPayload((0, $a31e9366eb776d45$export$9b894e906e2387e8), (0, $a31e9366eb776d45$export$fc38c637d0867478), message);
}
function $187217d9eb326259$export$ca60467b10700244(input, signatures) {
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
        else if (typeof s !== "string") return (0, $k3fDw$etherslibutils.joinSignature)(s);
        else return s;
    });
    return {
        message: input,
        signatures: serializedSignatures,
        version: "1"
    };
}


var $c243261a57fa0f8c$exports = {};

$parcel$export($c243261a57fa0f8c$exports, "verifySignaturiMessage", () => $c243261a57fa0f8c$export$633ff813c122bf86);


function $c243261a57fa0f8c$var$checkSignature(input, signature, index) {
    if (signature === null) return {
        result: "missing"
    };
    const address = (0, $k3fDw$etherslibutils.verifyTypedData)((0, $a31e9366eb776d45$export$9b894e906e2387e8), (0, $a31e9366eb776d45$export$fc38c637d0867478), input, signature);
    const expectedAddress = input.accounts[index].account;
    if (address.toLowerCase() !== expectedAddress.toLowerCase()) return {
        result: "bad"
    };
    return {
        result: "good"
    };
}
function $c243261a57fa0f8c$var$calculateValidity(results) {
    let good = 0;
    for(let i = 0; i < results.length; i++){
        const result = results[i];
        if (result.result === "bad") return {
            isValid: false,
            message: `Bad signature #${i + 1}.`
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
function $c243261a57fa0f8c$export$633ff813c122bf86(encodedMessage) {
    const { message: input , signatures: signatures  } = encodedMessage;
    const signatureResults = signatures.map((s, i)=>$c243261a57fa0f8c$var$checkSignature(input, s, i));
    const { isValid: isValid , message: message  } = $c243261a57fa0f8c$var$calculateValidity(signatureResults);
    return {
        isValid: isValid,
        message: message,
        signatures: signatureResults
    };
}


$parcel$exportWildcard(module.exports, $187217d9eb326259$exports);
$parcel$exportWildcard(module.exports, $c243261a57fa0f8c$exports);


//# sourceMappingURL=main.js.map
