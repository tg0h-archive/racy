//accepts 2 positional parameters

import {run} from '../../service/http/boards.service.mjs'

let command = 'list [boards]'

let desc = 'list boards'

//not accepting any parameters
let builder = function (yargs) {
    // return yargs.commandDir('remote_cmds')
    return yargs.option('boards', {
        alias: 't',
        // demandOption: true,
        describe: 'the dynamodb table name to read from',
        type: 'string'
    }).option('f', {
        alias: 'format',
        default: 'json',
        describe: 'the format of the output, can be json or csv',
        choices: ['json', 'csv']
    })
}
// let aliases = ['d']

let handler = async function (argv) {
    let data = await run()
    // let output = convert(data)
    console.log('argv', argv)
    console.log('', data)
}

export {command, desc, builder, handler}
