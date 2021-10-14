import {projectIds} from "../data/projectIds.data.mjs";

function parseMention(mention) {
    // takes a ticket commit comment or mr comment and returns the parsed comment
    let parsedBody = parseBody(mention.body);
    let parsedMention = {
        created: mention.created,
        ...parsedBody
    }
    return parsedMention
}

function parseBody(body) {
    // the mention type has a space, eg 'merge request'
    let bodyRegex = /\[(?<userName>.*?)\|(?<userUrl>.*?)].*\[a (?<mentionType>.*?) of (?<projectNameFull>.*?)\|(?<mentionUrl>.*?)](:\n')(?<mentionDescription>.*)'/
    let bodyMatches = body.match(bodyRegex)

    // sample commit mentionUrl        https://git.ads.certis.site/optimax/optimax-apps/optimax-cc/-/commit/86e4a2d5b3473de655981d9fe25435e2a8dd4ed2
    // sample merge request mentionUrl https://git.ads.certis.site/optimax/optimax-apps/optimax-cc/-/merge_requests/896
    let mentionUrl = bodyMatches?.groups.mentionUrl

    // we must escape / by adding a \ to get \/
    // .*\/ is greedy and matches until the last / before optimax-cc
    // (?=\/-) is a negative lookahead expression. it matches but does not capture the /- after optimax cc
    // let projectNameRegex = /.*\/(?<projectName>.*(?=\/-))/
    // the mention type here does not have a space, eg merge_requests
    let mentionUrlRegex = /.*\/(?<projectName>.*)\/-\/(?<mentionType>.*)\/(?<ref>.*)/

    // TODO: what to do if projects not found, throw error or fail silently?
    let {projectName, mentionType, ref} = mentionUrl.match(mentionUrlRegex)?.groups
    let projectId = projectIds[projectName]
    let parsedBody = {
        mentionType,
        projectName,
        projectId,
        ref, //commit sha or merge request number
        ...bodyMatches?.groups
    }
    return parsedBody;
}


export {parseMention}

