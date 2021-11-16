//accepts 2 positional parameters


import {Pipeline} from "../core/pipeline.mjs";
import {jiraMiddleware} from "../service/jira/jira.middleware.mjs";
import {formatMiddleware} from "../service/format/format.middleware.mjs";
import {outputMiddleware} from "../service/output/output.middleware.mjs";
import {lookupMiddleware} from "../service/transform/lookup/lookup.middleware.mjs";
import {cache} from "../libs/got/cache/cache.mjs";
import {joinMiddleware} from "../service/transform/join/join.middleware.mjs";
import {sortMiddleware} from "../service/transform/sort/sort.middleware.mjs";
import {demultiplexerMiddleware} from "../service/demultiplexer/demultiplexer.middleware.mjs";

let command = '<status>'

let desc = "run this command when users ask what's the flipping status?! (ノ ゜Д゜)ノ ︵ ┻━┻"

//not accepting any parameters
let builder = function (yargs) {
    // return yargs.commandDir('remote_cmds')
    return yargs
        .option('board', {
            alias: ['b', 'boardId'],
            default: 246,
            describe: 'the jira board id to show'
        })
        .option('sprints', {
            alias: ['s', 'sprintIds'],
            type: 'array',
            describe: 'the jira sprint id to show',
            demand: true
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

    const pipeline = new Pipeline();
    //TODO: code SMELL?
    pipeline.use(demultiplexerMiddleware)
    // pipeline.use(jiraMiddleware)
    pipeline.use(lookupMiddleware)
    pipeline.use(joinMiddleware)
    pipeline.use(sortMiddleware)
    pipeline.use(formatMiddleware)
    // boardsPipeline.use(outputMiddleware)


    let initialContext = {request: {argv}, response: {}}

    // TODO - how to set up and close cache, use middleware?
    // await cache.connect() //should only connect if cache is available
    let context = await pipeline.run(initialContext)
        .catch(err => {
            console.error('Error running middleware', err)
        })
    // await cache.close() //should only connect if cache is available
}

export {command, desc, builder, handler}
