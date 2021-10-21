const mergeRequestGitlabParamBuilder = function (attributes) {
    // TODO: better naming?
    let {projectId, mergeRequestId} = attributes

    let http = this.http = {}

    if (projectId && mergeRequestId) {
        http.urlPath = `/projects/${projectId}/merge_requests/${mergeRequestId}`
    } else {
        // TODO design error handling
        // throw new Error(`project id or commit missing}`)
    }
}

export {mergeRequestGitlabParamBuilder}
