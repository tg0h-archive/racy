import {ticketEditDemultiplexer} from "./builders/ticket.edit.demultiplexer.mjs";

let demultiplexers = {
    edit: ticketEditDemultiplexer
}
export function ticketDemultiplexerFactory(subcommand) {

    if (!subcommand) {
        throw new Error('Error: subcommand not provided')
    }
    let demultiplexer = demultiplexers[subcommand]

    return demultiplexer
}
