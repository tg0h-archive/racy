import {parseMention} from "./mention.parser.mjs";
import {ticketCache} from "../../cache/ticket.cache.singleton.mjs";
import {gitlab} from "../../../../../gitlab/gitlab.service.mjs";
import pMap from "p-map"
import {gitlabPMapper} from "./gitlabCommand.pMapper.mjs";

// todo code smell, passing argv deep into the core
const statusDictBuilder = async function (argv, data) {

    data.forEach((ticket) => {
        // a ticket without comments will still have a comment object with an empty comments array
        ticket.fields.comment.comments.forEach((comment) => {
            if (comment.author.name === 'certis.ads') {
                let parsedMention = parseMention(comment)
                parsedMention.ticket = ticket.key
                ticketCache.update(ticket.key, parsedMention)
            }
        })
    })

    let parsedMentions = ticketCache.cache.mentions

    // pMap accepts a mapper function and uses it to call gitlab
    let mentionStatus = await pMap(parsedMentions, gitlabPMapper)
    console.log('result', result.length)

    // buildDicts(mentions)


    return {}
}

export {statusDictBuilder}
