// https://www.dofactory.com/javascript/design-patterns/builder
import {LocationsJoinBuilder} from "./builders/locations.joinBuilder.mjs";
import {statusJoinBuilder} from "./builders/status.joinBuilder.mjs";

const joinBuilders = {
    // Locations: LocationsJoinBuilder,
    status: statusJoinBuilder
}

function joinFactory(command) {
    //data is in data.Items
    // const {data, dicts} = response
    if (!command) {
        throw new Error('Error: command not provided')
    }

    const join = joinBuilders[command]
    return join
}

export {joinFactory}
