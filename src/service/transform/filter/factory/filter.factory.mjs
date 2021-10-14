// https://www.dofactory.com/javascript/design-patterns/builder
import {LocationsFilterBuilder} from "./builders/locations.filterBuilder.mjs";

const filterBuilders = {
    Locations: LocationsFilterBuilder
}

/***
 * gets the param builder, builds the param, returns the param
 * scan call does not provide attributes
 * @param tableName:  read | del | scan
 * @param response argv
 * @returns {Promise<*>}
 */
function filterFactory(tableName, response) {
    //data is in data.Items
    const {data} = response
    if (!tableName) {
        throw new Error('Error: tableName not provided')
    }

    const filter = filterBuilders[tableName]
    return filter(data) //returns joined data todo mutates data :|
}

export {filterFactory}
