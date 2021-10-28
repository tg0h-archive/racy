// https://www.dofactory.com/javascript/design-patterns/builder
import {StatusSortBuilder} from "./builders/status.sort.builder.mjs";

const sortBuilders = {
    status: StatusSortBuilder
}

function sortFactory(command) {
    if (!command) {
        throw new Error('Error: command not provided')
    }

    const sort = sortBuilders[command]
    return sort //returns the sorter function, not the data
}

export {sortFactory}
