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
    console.log('argv',argv)

    // let arr = [label,fixVersion,component,title,points,comments,sprint,ticketIds]

    let http = this.http = {}

    let [ticketId] = ticketIds

    http.urlPath = `/rest/api/3/issue/${prefix}-${ticketId}`
    let body = {}


    let labelBody = addLabels(labels)
    let fixVersionBody = addFixVersions([fixVersion])
    let components = addComponents([component])
    let summaryValue = addSummary(summary)
    let pointsValue = addPoints(points)

    // might need to use separate api call for sprint
    // https://developer.atlassian.com/cloud/jira/software/rest/api-group-sprint/#api-agile-1-0-sprint-sprintid-issue-post
    // let sprintValue = addSprint([sprint])
    let arr = [labelBody, fixVersionBody, components, summaryValue,pointsValue]

    const updatePayload = Object.fromEntries(arr)
    http.json = {update: updatePayload}
    console.log('http.json',http.json.update)

    http.method = "put"
}

export {ticketsEditHttpParamBuilder}
