import yaml from "js-yaml";
import {readFileSync} from "fs";
import {path} from 'Ramda'
import Table from 'cli-table3';

function getGitStatus(commitStatus) {
    // console.log('coommitStatus', commitStatus)
    // let rs = commitStatus?.refStatus
    // console.log('rs', rs)
    let isInProd = commitStatus?.refStatus?.some((ref) => {
        if (ref.name.match(/release/)) {
            return true
        }
        if (ref.name.match(/^v.*/) && ref.type === 'tag') {
            return true
        }
        return false
    })
    let isInMaster = commitStatus?.refStatus?.some((ref) => {
        if (ref.name.match(/master/)) {
            return true
        }
        return false
    })
    let isInDev = commitStatus?.refStatus?.some((ref) => {
        if (ref.name.match(/develop/)) {
            return true
        }
        return false
    })
    let isInFeature = commitStatus?.refStatus?.some((ref) => {
        if (ref.name.match(/feature/)) {
            return true
        }
        return false
    })
    // console.log('prd', isInProd)
    // console.log('master', isInMaster)
    // console.log('dev', isInDev)
    // console.log('feat', isInFeature)
    // let x = {
    //     isInProd: 5,
    //     isInMaster: 4,
    //     isInDev: 3,
    //     isInFeature: 2
    // }
    if (isInProd) {
        return 5
    } else if (isInMaster) {
        return 4
    } else if (isInDev) {
        return 3
    } else if (isInFeature) {
        return 2
    }
// if branch contains release
    //     col =
}

function buildStatusTable(ticketStatusId, commitStatus, statusColumnsConfig) {
    // console.log('ticketStatusId',ticketStatusId)
    // console.log('commitStatus',commitStatus)
    // console.log('statuscoonfig',statusColumnsConfig)
    let statusRow = new Array(6)

    let statusConfig = statusColumnsConfig[ticketStatusId]
    let col = statusConfig.column
    let icon = statusConfig.icon
    statusRow[col] = icon

    let gitCol = getGitStatus(commitStatus)
    if (col !== gitCol){
        statusRow[gitCol] = '💔'
    }

    return statusRow;
}

const statusTableFormatBuilder = function (data, dicts) {
    const url = new URL('./status.table.config.yml', import.meta.url)
    const config = yaml.load(readFileSync(url));
    // console.log('statsuConfig',config)
    //
    // const transform = [unwind({paths: locationRecipe.unwind})];
    // const json2csvParser = new Parser({fields: locationRecipe.fields, transform});
    // return json2csvParser.parse(items)
    // console.log('hello', dicts)
    let ticketConfig = config.ticket
    // let fixVersion =
    let getEpic = path(ticketConfig.epic.field)
    let getComponent = path(ticketConfig.component.field)
    let getDesc = path(ticketConfig.desc.field)
    let getKey = path(ticketConfig.key.field)
    let getRef = path(ticketConfig.ref.field)
    //TODO: BUG fix version contains mulitple values, get latest
    let getFixVersion = path(ticketConfig.fixVersion.field)
    let getIssueType = path(ticketConfig.issueType.field)

    let commitStatusDict = dicts.ticketCommitStatus
    // console.log('commitStatd',commitStatusDict)

    let statusTable = data.map((ticket) => {

        let epic = getEpic(ticket)
        let comp = getComponent(ticket)
        let desc = getDesc(ticket)
        let key = getKey(ticket)
        let issueType = getIssueType(ticket)
        let fixVersion = getFixVersion(ticket)

        let commitStatus = commitStatusDict[key]
        let ref = commitStatus?.ref
        let row = [epic, comp, issueType, desc, key, fixVersion, ref]

        // console.log('key is',key)
        // console.log('cs',cs)


        let ticketStatusId = ticket.fields.status.id
        let statusColumns = buildStatusTable(ticketStatusId, commitStatus, config.statusColumns)
        row.push(...statusColumns)
        // console.log('row',row)
        return row;
    })

    let colWidths=[10,15,7,40,null,null,10]
    let head = ['epic','comp','type', 'desc','ticket','fixVersion','ref','tod','wip','bra','dev','stg','don']

    let table = new Table({head, colWidths});
    table.push(...statusTable)
    console.log(table.toString())
    //
    // console.log('commitStatusDict',dicts)
}

export {statusTableFormatBuilder}
