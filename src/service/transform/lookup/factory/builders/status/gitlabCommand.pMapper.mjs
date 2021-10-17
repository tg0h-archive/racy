import {gitlab} from "../../../../../gitlab/gitlab.service.mjs";

const gitlabPMapper = async parsedMention => {
    let {projectId, mentionType, ref} = parsedMention
    let translateToGitlabCommand = {commit: 'commits', 'merge request': 'mergeRequests'}
    let translateToGitlabParamAttribute = {commit: 'commit', 'merge request': 'mergeRequestId'}

    // const resp = await gitlab('commits', {projectId, commit: ref})
    // dynamic property keys with {[dynamicKey]: val}
    const resp = await gitlab(translateToGitlabCommand[mentionType], {
        projectId,
        [translateToGitlabParamAttribute[mentionType]]: ref
    })
    // refStatus stores the commit branch status (what branches the commit is on) or the merge request status
    return {refStatus: resp, ...parsedMention}
}

export {gitlabPMapper}
