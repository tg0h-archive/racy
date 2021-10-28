import {ticketRefStatusDictBuilder} from "./builders/ticketRefStatus.dictBuilder.mjs";
import {ticketStatusDictBuilder} from "./builders/ticketStatus.dictBuilder.mjs";
import {ticketDictBuilder} from "./builders/ticket.dict.builder.mjs";

const dictBuilders = {
    ticketCommitStatus: ticketRefStatusDictBuilder('commit'),
    ticketMergeRequestStatus: ticketRefStatusDictBuilder('mergeRequest'),
    ticketStatus: ticketStatusDictBuilder,
    ticket: ticketDictBuilder
}

function ticketStatusFactory(dictType, mentionStatuses) {
    // given the command, return dictionaries to attach to the response
    if (!dictType) {
        throw new Error("Error: what's your dict type?")
    }

    const dictBuilder = dictBuilders[dictType]
    const dictionary = dictBuilder(mentionStatuses)
    return dictionary
}

export {ticketStatusFactory}
