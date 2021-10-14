//accepts 2 positional parameters


import {Pipeline} from "../core/pipeline.mjs";
import {jiraMiddleware} from "../service/jira/jira.middleware.mjs";
import {formatMiddleware} from "../service/format/format.middleware.mjs";
import {outputMiddleware} from "../service/output/output.middleware.mjs";
import {lookupMiddleware} from "../service/transform/lookup/lookup.middleware.mjs";

let command = '<status>'

let desc = "run this command when users ask what's the flipping status?! (ノ ゜Д゜)ノ ︵ ┻━┻"

//not accepting any parameters
let builder = function (yargs) {
    // return yargs.commandDir('remote_cmds')
    return yargs
        .option('board',{
            alias: ['b','boardId'],
            default: 23,
            describe: 'the jira board id to show'
        })
        .option('sprint',{
            alias: ['s','sprintId'],
            default: 97,
            describe: 'the jira board id to show'
        })
        .option('format', {
            alias: 'f',
            default: 'table',
            describe: 'the format of the output, can be json or csv',
            // choices: ['json', 'csv']
            choices: ['table', 'json']
            // TODO: use middleware to create an alias of table, t and json, j
        })
}
// let aliases = ['d']

let handler = async function (argv) {
    //TODO: is there a better way to do this?
    argv.command = argv._[0]

    const boardsPipeline = new Pipeline();
    boardsPipeline.use(jiraMiddleware)
    boardsPipeline.use(lookupMiddleware)
    // boardsPipeline.use(formatMiddleware)
    // boardsPipeline.use(outputMiddleware)


    let initialContext = {request: {argv}, response: {}}
    let context = await boardsPipeline.run(initialContext)
        .catch(err => {
            console.error('Error running middleware', err)
        })
}

export {command, desc, builder, handler}
