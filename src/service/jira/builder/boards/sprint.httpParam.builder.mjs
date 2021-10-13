const sprintsHttpParamBuilder = function ({boardId, sprintId}) {
    if (boardId && sprintId) {
        // get tickets for sprint
        this.urlPath = `/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`
        this.payloadKey = "issues"
    } else if (boardId && !sprintId) {
        // get all sprints
        this.urlPath = `/rest/agile/1.0/board`
    }
}

export {sprintsHttpParamBuilder}
