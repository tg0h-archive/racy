// import {get} from '../../../../dynamoDb/read/read.service.mjs'
import {readFileSync} from 'fs'
import yaml from "js-yaml";
// todo dictRecipes inside or outside function?
const dictRecipes = yaml.load(readFileSync(new URL('../recipes/dicts/dynamo.dictionary.recipes.yml', import.meta.url)));
// import {paramFactory} from "../../../../dynamoDb/core/factory/param.factory.mjs";

/***
 * expect canonical name for type (tableName): Locations, not locations
 * @param tableName - the table name
 * @param argv
 * @returns {Promise<void>}
 */
const dynamoDictBuilder = async function (tableName, argv) {
    // pull complexity downwards, let the paramFactory handle the complexity of building the params
    const params = paramFactory('scan',argv)
    const data = await get(null, params)
    var dict = buildDict(tableName, data);
    return dict
}

//todo code smell - buildDict depends on the response schema of the get service
function buildDict(tableName, data) {
    var dict = {};
    let primaryKey = dictRecipes[tableName]
    // the dictionary's key is the same as the data item key
    // the dictionary key stores the data item
    for (let i = 0, dataItem; i < data.Count; i++) {
        dataItem = data.Items[i];
        dict[dataItem[primaryKey]] = dataItem;
    }
    return dict;
}

export {dynamoDictBuilder}
