// https://www.dofactory.com/javascript/design-patterns/builder
import {locationsCsvFormatBuilder} from "./builders/csv/locations.csv.formatBuilder.mjs";
import {jsonFormatBuilderProxy as json} from "./builders/json/json.formatBuilder.proxy.mjs";

const csv = {Locations: locationsCsvFormatBuilder}
const table = {}

const formatBuilders = {
    csv,
    table,
    json
}

/***
 * gets the param builder, builds the param, returns the param
 * scan call does not provide attributes
 * @param tableName:  read | del | scan
 * @param response argv
 * @returns {Promise<*>}
 */
function formatFactory(format, {request, response}) {
    //data is in data.Items
    // todo - do i return the data or a function that returns the data? zzzzz
    // if i return a function, i can use functional programming, if i return the data, i'm stuck?
    const {config, table} = request.argv
    //TODO: CODE SMELL - assumes that data is an array in response.data
    const items = response.data
    if (!format) {
        throw new Error('Error: format not provided')
    }

    const formatter = formatBuilders[format][table]
    return formatter(items) //returns joined data todo mutates data :|
}

export {formatFactory}
