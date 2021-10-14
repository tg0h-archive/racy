import {dynamoDictBuilder} from "./dynamo.dictBuilder.mjs";

const dictBuilders = {
    Locations: dynamoDictBuilder
}


/***
 * expect canonical name of type, eg Locations not locations
 * @param tableName
 * @param argv
 * @returns {*}
 */
async function dictFactory(tableName, argv) {

    if (!tableName) {throw new Error('Error: tableName not provided')}

    const dictBuilder = dictBuilders[tableName]
    return await dictBuilder(tableName, argv)
}

export {dictFactory}
