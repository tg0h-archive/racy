import {
    addComponents,
    addFixVersions,
    addLabels,
    addPoints,
    // addSprint,
    addSummary
} from "./ticketsEdit.json.builder.mjs";

const ticketsEditHttpParamBuilder = function (argv) {
    let {
        labels,
        fixVersion,
        component,
        summary,
        points,
        // sprint,
        ticketIds,
        prefix
    } = argv

    // let arr = [label,fixVersion,component,title,points,comments,sprint,ticketIds]

    let http = this.http = {}

    let [ticketId] = ticketIds

    http.urlPath = `/rest/api/3/issue/${prefix}-${ticketId}`
    let body = {}


    let arr = []
    labels && arr.push(addLabels(labels))
    fixVersion && arr.push(addFixVersions([fixVersion]))
    component && arr.push(addComponents([component]))
    summary && arr.push(addSummary(summary))
    points && arr.push(addPoints(points))

    // might need to use separate api call for sprint
    // https://developer.atlassian.com/cloud/jira/software/rest/api-group-sprint/#api-agile-1-0-sprint-sprintid-issue-post

    const updatePayload = Object.fromEntries(arr)
    http.json = {update: updatePayload}

    http.method = "put"
}

export {ticketsEditHttpParamBuilder}
