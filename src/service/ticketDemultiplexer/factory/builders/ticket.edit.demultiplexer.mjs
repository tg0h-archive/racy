import {jira} from "../../../jira/jira.service.mjs";
import pMap from "p-map"

export async function ticketEditDemultiplexer(argv) {
    let ticketIds = argv.ticketIds

    const mapper = async ticketId => {
        let args = {...argv}
        args.ticketIds = [ticketId]
        const resp = await jira(args)
    }

    let result = await pMap(ticketIds, mapper)
}
