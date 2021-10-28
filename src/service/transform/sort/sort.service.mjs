import {sortFactory} from "./factory/sort.factory.mjs.mjs";

const sort = (command,data) => {
    // todo if we want the service to be agnostic, then the request and response must be independent of the yargs and dynamodb argv structure

    try {
        let sort =  sortFactory(command)
        return sort(data)
    } catch (err) {
        console.log("Error", err);
    }
};
export {sort}
