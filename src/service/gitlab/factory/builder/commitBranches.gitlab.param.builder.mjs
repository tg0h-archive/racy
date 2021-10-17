const commitBranchesGitlabParamBuilder = function (attributes) {
    let {projectId, commit} = attributes
    // get the branches or tags the commit has been pushed to

    if (projectId && commit) {
        this.urlPath = `/projects/${projectId}/repository/commits/${commit}/refs`
    } else {
        // throw new Error(`project id or commit missing}`)
    }
}

export {commitBranchesGitlabParamBuilder}
