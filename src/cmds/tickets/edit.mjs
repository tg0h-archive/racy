//accepts 2 positional parameters

import {Pipeline} from "../../core/pipeline.mjs";
import {jiraMiddleware} from "../../service/jira/jira.middleware.mjs";
import {formatMiddleware} from "../../service/format/format.middleware.mjs";
import {outputMiddleware} from "../../service/output/output.middleware.mjs";
import {demultiplexerMiddleware} from "../../service/demultiplexer/demultiplexer.middleware.mjs";

let command = 'edit <ticketIds...>'

let desc = 'edit tickets'

//not accepting any parameters
let builder = function (yargs) {
    // return yargs.commandDir('remote_cmds')
    return yargs
        .positional('ticketIds', {
            type: 'array',
            describe: 'one or more ticket ids (ticket prefix (eg ARG) does not need to specified)',
            demand: true
        })
        .option('prefix', {
            describe: 'ticket prefix',
            default: 'ARG',
        })
        .option('fix-version', {
            describe: 'fix version',
            alias: 'v',
        })
        .option('component', {
            describe: 'component',
            alias: 'c'
        })
        .option('labels', {
            type: 'array',
            describe: 'labels',
            alias: 'l'
        })
        .option('summary', {
            describe: 'summary',
            alias: 'm'
        })
        .option('points', {
            describe: 'story points',
            alias: 'p'
        })
        // .option('comments', {
        //     describe: 'comments',
        //     alias: 'm'
        // })
        // .option('sprint', {
        //     describe: 'sprint',
        //     alias: 's'
        // })
        .option('format', {
            alias: 'f',
            default: 'json',
            describe: 'the format of the output, can be json or csv',
            // choices: ['json', 'csv']
            choices: ['json']
        })
}
// let aliases = ['d']

let handler = async function (argv) {
    argv.command = 'tickets'
    argv.subCommand = 'edit'
    argv.commands = ['tickets', 'edit']
    const boardsPipeline = new Pipeline();
    boardsPipeline.use(demultiplexerMiddleware)
    // boardsPipeline.use(jiraMiddleware)
    // boardsPipeline.use(formatMiddleware)
    // boardsPipeline.use(outputMiddleware)

    let initialContext = {request: {argv}, response: {}}
    let context = await boardsPipeline.run(initialContext)
        .catch(err => {
            console.error('Error running middleware', err)
        })
}

export {command, desc, builder, handler}
