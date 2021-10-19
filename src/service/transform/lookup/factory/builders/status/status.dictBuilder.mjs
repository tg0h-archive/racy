import {parseMention} from "./mention.parser.mjs";
import {ticketCache} from "../../cache/ticket.cache.singleton.mjs";
import {gitlab} from "../../../../../gitlab/gitlab.service.mjs";
import pMap from "p-map"
import {gitlabPMapper} from "./gitlabCommand.pMapper.mjs";
import {ticketStatusFactory} from "./factory/ticketStatus.factory.mjs";

// todo code smell, passing argv deep into the core
const statusDictBuilder = async function (argv, data) {

    data.forEach((ticket) => {
        // a ticket without comments will still have a comment object with an empty comments array
        ticket.fields.comment.comments.forEach((comment) => {
            if (comment.author.name === 'certis.ads') {
                let parsedMention = parseMention(comment)
                parsedMention.ticket = ticket.key
                //ticket details are not stored, only the mention
                ticketCache.update(ticket.key, parsedMention)
            }
        })
    })

    let parsedMentions = ticketCache.cache.mentions

    // pMap accepts a mapper function and uses it to call gitlab
    let mentionStatuses = await pMap(parsedMentions, gitlabPMapper)

    let ticketCommitStatusDict = ticketStatusFactory('ticketCommitStatus',mentionStatuses)
    let ticketMergeRequestStatusDict = ticketStatusFactory('ticketMergeRequestStatus',mentionStatuses)
    let ticketStatusDict = ticketStatusFactory('ticketStatus',mentionStatuses)

    // console.log('ticketCommitStatusDict',ticketCommitStatusDict)
    // console.log('ticketCommitStatusDict',ticketMergeRequestStatusDict)
    console.log('ticketCommitStatusDict',ticketStatusDict['ARG-2968'])
    console.log('ticketCommitStatusDict',ticketStatusDict['ARG-2968'].commits[0].refStatus)

    // console.log('result', mentionStatus.length)
    // console.log('result', mentionStatus)
    // console.log('mentionStatus',mentionStatus[0].refStatus)
    // console.log('mentionStatus',mentionStatus[1].refStatus)

    // buildDicts(mentions)


    return {}
}

export {statusDictBuilder}
