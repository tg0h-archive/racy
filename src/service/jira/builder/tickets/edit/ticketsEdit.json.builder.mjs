export const addLabels = (labels) => {
    let jsonValue = labels.map((label) => {
        return {add: label}
    })
    return ['labels', jsonValue]
}
export const addFixVersions = (fixVersions) => {
    // if fixVersions is a name use name key
    // if fixVersions is an id use id key
    let jsonValueArray = fixVersions.map((fixVersion) => {
        return {add: {name: fixVersion}}
    })
    return ['fixVersions', jsonValueArray]
}
export const addComponents= (components) => {
    let jsonValueArray = components.map((component) => {
        return {add: {name: component}}
    })
    return ['components', jsonValueArray]
}

export const addSummary= (summary) => {
    let jsonValueArray=[{set: summary}]
    return ['summary', jsonValueArray]
}

export const addPoints= (points) => {
    let jsonValueArray=[{set: points}]
    return ['customfield_10106', jsonValueArray]
}
export const addSprint= (sprints) => {
    let jsonValueArray = sprints.map((sprint) => {
        return {add: {id: sprint}}
    })
    // "sprint": "Field 'sprint' cannot be set. It is not on the appropriate screen, or unknown."
    // https://developer.atlassian.com/cloud/jira/software/rest/api-group-sprint/#api-agile-1-0-sprint-sprintid-issue-post
    // return ['sprint', jsonValueArray]
    return ['customfield_10100', jsonValueArray]
}
