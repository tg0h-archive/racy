import {ticketCache} from "../../../../cache/ticket.cache.singleton.mjs";

const ticketDictBuilder = function () {
    let tickets = ticketCache.cache.tickets
    return tickets
}

export {ticketDictBuilder}
