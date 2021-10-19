// import {get} from '../../../../dynamoDb/read/read.service.mjs'
import {readFileSync} from 'fs'
import yaml from "js-yaml";
// todo dictRecipes inside or outside function?
// const dictRecipes = yaml.load(readFileSync(new URL('../recipes/dicts/dynamo.dictionary.recipes.yml', import.meta.url)));
// import {paramFactory} from "../../../../dynamoDb/core/factory/param.factory.mjs";

const ticketStatusDictBuilder = function (mentionStatuses) {

    // TODO: typescript would be so good here to type all the types
    // stores all the comm statuses for each ticket
    // {
    //   ARG-1234:{commits:[], mergeRequests:[]}
    //   ARG-3459:{commits:[], mergeRequests:[]}
    // }
    let ticketStatusDict = {}

    //TODO: it will be fun to slowly add typing to this
    // if mention status is a status for the ticket's latest commit, add it to the dictionary
    mentionStatuses?.forEach((mentionStatus) => {
        let ticket = mentionStatus.ticket
        ticketStatusDict[ticket] ??= {}

        // TODO: code smell hardcode mentionType
        if (mentionStatus.mentionType === 'commit') {
            ticketStatusDict[ticket].commits ??= []
            ticketStatusDict[ticket].commits.push(mentionStatus)
        } else if (mentionStatus.mentionType === 'merge request') {
            ticketStatusDict[ticket].mergeRequests ??= []
            ticketStatusDict[ticket].mergeRequests.push(mentionStatus)
        }
    })
    return ticketStatusDict
}

export {ticketStatusDictBuilder}
