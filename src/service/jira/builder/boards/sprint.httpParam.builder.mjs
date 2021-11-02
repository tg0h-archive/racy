const sprintsHttpParamBuilder = function ({boardId, sprintId}) {
    let http = this.http = {}
    if (boardId && sprintId) {
        // get tickets for sprint
        http.urlPath = `/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`
        http.payloadKey = "issues"
    } else if (boardId && !sprintId) {
        // get all sprints
        http.urlPath = `/rest/agile/1.0/board`
    }
    http.method = "get"
}

export {sprintsHttpParamBuilder}
