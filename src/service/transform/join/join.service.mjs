import {joinFactory} from "./factory/join.factory.mjs";

const join = (command, data, dicts) => {
    // todo if we want the service to be agnostic, then the request and response must be independent of the yargs and dynamodb argv structure
    try {
        const join = joinFactory(command)
        return join(data, dicts)
    } catch (err) {
        console.log("Error", err);
    }
};
export {join}
