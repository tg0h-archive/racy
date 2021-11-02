import {commands} from './tickets/index.mjs'

let command = 'tickets <command>'
let desc = 'manage tickets'
let builder = function (yargs) {
    return yargs.command(commands)
}
let handler = function (argv) {}

export {command, desc, builder, handler}
