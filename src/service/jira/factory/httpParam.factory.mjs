import {boardsHttpParamBuilder} from "../builder/boards/boards.httpParam.builder.mjs";
import {sprintsHttpParamBuilder} from "../builder/boards/sprint.httpParam.builder.mjs";

// params contain the urlPath, the request body, and the payloadKey
// the key refers to the location of the payload
// eg sprint tickets are located in response.issues
// while boards are located in response.values ... zzz
const boards = {boardsHttpParamBuilder}
const sprints = {sprintsHttpParamBuilder}

const paramBuilders = {
    boards: boardsHttpParamBuilder,
    // map the status command to the sprints builder
    // the sprints builder can also be used to get all the sprints
    status: sprintsHttpParamBuilder
}

function paramFactory(command, attributes) {

    if (!command) {
        throw new Error('Error: command not provided')
    }
    const paramBuilder = paramBuilders[command]
    const params =  new paramBuilder(attributes)
    return params
}

export {paramFactory}
