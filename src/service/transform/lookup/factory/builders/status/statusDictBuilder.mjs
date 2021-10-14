import {parseMention} from "./mention.parser.mjs";
import {ticketCache} from "../../cache/ticket.cache.singleton.mjs";

function parseMentionComment(comment) {
    return 0;
}

// todo code smell, passing argv deep into the core
const statusDictBuilder = async function (argv, data) {
    // let [locations] = await Promise.all([
    //     // dictFactory(tableName, argv),
    // ]);

    let i = 0

    data.forEach((ticket) => {
        if (i++ == 0) {
            // console.log('ticket', ticket)
            console.log('id', ticket.key)
        }

        // a ticket without comments will still have a comment object with an empty comments array
        // mentions is the reducer accumulator, return an array of mentions
        let ticketMentions = ticket.fields.comment.comments.forEach((comment) => {
            if (comment.author.name === 'certis.ads') {
                let parsedMention = parseMention(comment)
                parsedMention.ticket = ticket.key
                ticketCache.update(ticket.key, parsedMention)
            }
        })
    })

    let c = ticketCache.cache
    console.log('c',c)
    //
    // mentions = mentions.flat(1)

    // taskify(mentions)

    // buildDicts(mentions)


    return {}
}

export {statusDictBuilder}
