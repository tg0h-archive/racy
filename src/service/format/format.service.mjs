import {formatFactory} from "./factory/format.factory.mjs";

const format = (ctx) => {
    // todo if we want the service to be agnostic, then the request and response must be independent of the yargs and dynamodb argv structure
    try {
        let format = ctx.request.argv.format
        return formatFactory(format, ctx) //returns joined data
    } catch (err) {
        console.log("Error", err);
    }
};
export {format}
