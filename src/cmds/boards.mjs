import {commands} from './boards/index.mjs'

let command = 'boards <command>'
let desc = 'manage boards'
let builder = function (yargs) {
    // return yargs.commandDir('remote_cmds')
    return yargs.command(commands)
}
let handler = function (argv) {}

export {command, desc, builder, handler}
