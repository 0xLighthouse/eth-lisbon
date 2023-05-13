const randomWords = require('random-words')

export const generateName = () => {
    return randomWords({ exactly: 3, seed: Date.now() }).join('-');
}
