var randomWords = require('random-words');


const generateName = () => {
    return randomWords({ exactly: 3, seed: Date.now() }).join('-');
}
