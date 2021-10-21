// import {get} from '../../../../dynamoDb/read/read.service.mjs'
import {readFileSync} from 'fs'
import yaml from "js-yaml";
// todo dictRecipes inside or outside function?
// const dictRecipes = yaml.load(readFileSync(new URL('../recipes/dicts/dynamo.dictionary.recipes.yml', import.meta.url)));
// import {paramFactory} from "../../../../dynamoDb/core/factory/param.factory.mjs";
import {ticketCache} from "../../../../cache/ticket.cache.singleton.mjs";
import {curry} from 'ramda'

const _ticketRefStatusDictBuilder = function (type, mentionStatuses) {
    // given a type, build a dict of the latest commit/merge request status for each
    // ticket
    let mapTypeToCacheKey = {
        commit: 'ticketLatestCommit',
        mergeRequest: 'ticketLatestMergeRequest',
    }

    // the ref can be either a commit sha or a merge request #
    let ticketLatestRefCache = ticketCache[mapTypeToCacheKey[type]]
    let ticketLatestMentionStatusDict = {}

    // TODO: it will be fun to slowly add typing to this
    // if mention status is a status for the ticket's latest commit, add it to the dictionary
    mentionStatuses?.forEach((mentionStatus) => {
        let ticket = mentionStatus.ticket
        let latestRef = ticketLatestRefCache[ticket]
        if (mentionStatus.ref === latestRef) {
            ticketLatestMentionStatusDict[ticket] = mentionStatus
        }
    })
    return ticketLatestMentionStatusDict
}

//you can pass the type or mentionStatuses one by one or all together if needed
const ticketRefStatusDictBuilder = curry(_ticketRefStatusDictBuilder)

export {ticketRefStatusDictBuilder}
