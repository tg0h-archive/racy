// https://www.dofactory.com/javascript/design-patterns/builder
import {LocationsJoinBuilder} from "./builders/locations.joinBuilder.mjs";

const joinBuilders = {
    Locations: LocationsJoinBuilder
}

/***
 * gets the param builder, builds the param, returns the param
 * scan call does not provide attributes
 * @param tableName:  read | del | scan
 * @param response argv
 * @returns {Promise<*>}
 */
function joinFactory(tableName, response) {
    //data is in data.Items
    const {data, dicts} = response
    if (!tableName) {
        throw new Error('Error: tableName not provided')
    }

    const join = joinBuilders[tableName]
    return join(data, dicts) //returns joined data
}

export {joinFactory}
