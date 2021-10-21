import {jiraGotter} from "../builder/jira.got.builder.mjs";
import {gitlabGotter} from "../builder/gitlab.got.builder.mjs";
import {createGotterProxy} from "../cache/gotter.proxy.mjs";

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
    let gotter = gotBuilders[type]
    let c = createGotterProxy(gotter)
    // return gotBuilders[type]
    return c
}

export {gotFactory}
