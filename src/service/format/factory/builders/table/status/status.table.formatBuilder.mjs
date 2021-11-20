import yaml from "js-yaml";
import {readFileSync} from "fs";
import {path,pathOr} from 'Ramda'
import Table from 'cli-table3';
import {TicketMapper} from "./helpers/ticket.mapper.mjs";
import {getColWidths} from "../table.builder.mjs";

const url = new URL('./status.table.config.yml', import.meta.url)
const config = yaml.load(readFileSync(url));
const getSubtasks = pathOr('tim', config.ticket.subtasks.field)

const statusTableFormatBuilder = function (data, dicts) {
    // console.log('dicts',dicts.ticketCommitStatus['ARG-2459'])
    const mapper = new TicketMapper(config,dicts.ticketCommitStatus)
    let rows = []
    // data.forEach((d)=>console.log('key is ',d.key))
    data.forEach((ticket) => {
        let t = mapper.map(ticket)
        rows.push(t)
        // rows.push(mapper.map(ticket))
        let subtasks = getSubtasks(ticket)
        if (subtasks?.length > 0) {
            subtasks.forEach((ticket) => {
                rows.push(mapper.map(ticket))
            })
        }
    })

    let c = getColWidths(config.view)
    let colWidths = getColWidths(config.view)
    //TODO: table header is hardcoded
    let head = ['epic', 'comp', 'type', 'desc', 'ticket', 'links', 'linkStatus', 'fixVersion', 'ref', 'td', 'ip', 'ut', 'dv', 'st', 'dn']
    let style = {head: ['green'], compact: true}

    let table = new Table({head, colWidths, style});
    table.push(...rows)
    console.log(table.toString())
}

export {statusTableFormatBuilder}
