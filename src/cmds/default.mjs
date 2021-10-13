// https://github.com/yargs/yargs/blob/master/docs/advanced.md#default-commands

// specify command in command string
// specify aliases with |
// eg get <foo> [bar]
// required positional args <foo|fwah>
// optional args [bar]
// optional args but as array [bar...]
let command = '*'

let desc = 'r4cy - release automation cli   (•_•)   ( •_•)>⌐■-■   (⌐■_■)   yaaaaas'
let builder = function (yargs) {
    // return yargs.commandDir('remote_cmds')
    return yargs.help('h')
        .usage('usage: $0 [options] <command> <subcommand> [parameters]')
        .demandCommand(1, '')
        .count('v')
        .option('v',{
            alias: 'verbose, verb',
            describe: 'how much logging do you want'
        })
        .choices('dynamo')
}
let handler = function (argv) {
}

export {command, desc, builder, handler}
