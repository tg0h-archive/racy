import {filterFactory} from "./factory/filter.factory.mjs";

const filter = ({request, response}) => {
    // todo if we want the service to be agnostic, then the request and response must be independent of the yargs and dynamodb argv structure
    const {argv} = request
    try {
        let tableName = argv.table
        //TODO: paginate query/scan https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/globals.html#paginatequery
        return filterFactory(tableName, response) //returns joined data
    } catch (err) {
        console.log("Error", err);
    }
};
export {filter}
