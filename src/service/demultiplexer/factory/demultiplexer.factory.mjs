import {ticketEditDemultiplexer} from "./builders/tickets/ticket.edit.demultiplexer.mjs";
import {statusSprintDemultiplexerProxy as status} from "./builders/status/status.sprint.demultiplexer.proxy.mjs";

let tickets = {
    edit: ticketEditDemultiplexer
}

const demuxBuilders = {
    status,
    tickets
}

export function demultiplexerFactory(command, subcommand) {

    if (!command) {
        throw new Error('Error: command not provided')
    }
    let demultiplexer = demuxBuilders[command][subcommand]

    return demultiplexer
}
