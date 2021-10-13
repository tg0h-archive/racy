//accepts 2 positional parameters

import {Pipeline} from "../../core/pipeline.mjs";
import {jiraMiddleware} from "../../service/jira/jira.middleware.mjs";
import {formatMiddleware} from "../../service/format/format.middleware.mjs";
import {outputMiddleware} from "../../service/output/output.middleware.mjs";

let command = 'list'

let desc = 'list boards'

//not accepting any parameters
let builder = function (yargs) {
    // return yargs.commandDir('remote_cmds')
    return yargs
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
    const boardsPipeline = new Pipeline();
    boardsPipeline.use(jiraMiddleware)
    boardsPipeline.use(formatMiddleware)
    boardsPipeline.use(outputMiddleware)


    let initialContext = {request: {argv}, response: {}}
    let context = await boardsPipeline.run(initialContext)
        .catch(err => {
            console.error('Error running middleware', err)
        })
}

export {command, desc, builder, handler}
