import {jiraGotter} from "../builder/jira.got.builder.mjs";
import {gitlabGotter} from "../builder/gitlab.got.builder.mjs";

// params contain the urlPath, the request body, and the payloadKey
// the key refers to the location of the payload
// eg sprint tickets are located in response.issues
// while boards are located in response.values ... zzz

const gotBuilders = {
    jira: jiraGotter,
    gitlab: gitlabGotter,
}

function gotFactory(type) {

    if (!type) {
        throw new Error('Error: command not provided')
    }
    // returns a got function that can make a http call
    return gotBuilders[type]
}

export {gotFactory}
