import {commitBranchesGitlabParamBuilder} from "./builder/commitBranches.gitlab.param.builder.mjs";

// params contain the urlPath, the request body, and the payloadKey
// the key refers to the location of the payload
// eg sprint tickets are located in response.issues
// while boards are located in response.values ... zzz


const paramBuilders = {
    commits: commitBranchesGitlabParamBuilder
}

function paramFactory(command, attributes) {

    if (!command) {
        throw new Error('Error: command not provided')
    }
    const paramBuilder = paramBuilders[command]
    const params =  new paramBuilder(attributes)
    return params
}

export {paramFactory}
