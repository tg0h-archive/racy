import {statusDictBuilder} from './builders/status/status.dictBuilder.mjs'

const dictBuilders = {status: statusDictBuilder}

async function dictsFactory(command, argv, data) {
    // given the command, return dictionaries to attach to the response
    if (!command) {
        throw new Error('Error: command not provided')
    }

    const dictBuilder = dictBuilders[command]
    const dictionary = dictBuilder(argv, data)
    return dictionary
}

export {dictsFactory}
