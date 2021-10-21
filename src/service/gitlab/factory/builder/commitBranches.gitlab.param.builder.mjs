const commitBranchesGitlabParamBuilder = function (attributes) {
    let {projectId, commit} = attributes
    // get the branches or tags the commit has been pushed to

    let http = this.http = {}

    if (projectId && commit) {
        http.urlPath = `/projects/${projectId}/repository/commits/${commit}/refs`
    } else {
        // throw new Error(`project id or commit missing}`)
    }
}

export {commitBranchesGitlabParamBuilder}
