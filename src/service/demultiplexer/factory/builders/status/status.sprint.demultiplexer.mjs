import {jira} from "../../../../jira/jira.service.mjs";
import pMap from "p-map"

export async function statusSprintDemultiplexer(argv) {
    let sprintIds = argv.sprintIds

    const mapper = async sprintId => {
        let args = {...argv}
        args.sprintId = sprintId
        const resp = await jira(args)
        return resp
    }

    // returns an array of arrays
    // [ [tickets from sprintId1], [tickets from sprintId2], ... ]
    let result = await pMap(sprintIds, mapper)
    let tickets = result.flat()

    return tickets
}
