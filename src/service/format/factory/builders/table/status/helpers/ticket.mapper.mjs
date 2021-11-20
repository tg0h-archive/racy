// sample c# mvc auto mapper api lol
// public void Save(UserViewModel uv) {
//     var config = new MapperConfiguration(cfg => {
//         cfg.CreateMap<UserViewModel , User>();
//     });
//     User u = config.CreateMapper().Map<User>(uv);
//     MyRepository.UpdateUser(u);
// }
import {curry, map, path} from "ramda";

// TODO use closures to make helpers private
export class TicketMapper {
    constructor(config, commitStatusDict) {
        this.config = config
        this.commitStatusDict = commitStatusDict
    }

    getFields(ticket) {
        let row = this.config.view.map((colConfig) => {
            // use ramda's path to dynamically access an object property
            // eg path(['fields','epic','name'](ticket) is equivalent to ticket.fields.epic.name
            let field = path(colConfig.field)(ticket)
            let map = colConfig.map
            if (map) {
                // if a map function is configured, apply the map function to the field
                field = this[map](field)
            }
            return field
        })
        return row
    }

    getRef(ticketId) {
        return this.commitStatusDict[ticketId]?.ref
    }

    getLinks(links) {
        let linkedTicketKeys = links.filter((link) => {
            let key = link.inwardIssue?.key ?? link.outwardIssue.key
            let keyPrefix = key.match(/(?<prefix>.*)-/).groups.prefix
            return this.config.links.prefixes.includes(keyPrefix)
        }).map((link) => {
            let key = link.inwardIssue?.key ?? link.outwardIssue.key
            return key // returns OTXSC-1234 or ACF-1234
        }).join() // concatenate with ,
        return linkedTicketKeys
    }

    getFixVersions(fixVersions) {
       let fixVersionNames = fixVersions.map((fixVersion) => {
            return fixVersion.name
        }).join() // concatenate with ,
        return fixVersionNames
    }

    getComponents(components) {
        //TODO - duplication
        let componentNames = components.map((component) => {
            return component.name
        }).join() // concatenate with ,
        return componentNames
    }

    map(ticket) {
        let jiraFields = this.getFields(ticket, this.config.view)
        let ticketId = path(this.config.model.key.field)(ticket)

        let commitStatus = this.commitStatusDict[ticketId]
        let ticketStatusId = path(this.config.model.ticketStatusId.field)(ticket)
        let statusColumns = this.buildStatusTable(ticketStatusId, commitStatus, this.config.statusColumns)

        let row = [...jiraFields, ...statusColumns]
        return row
    }

    buildStatusTable(ticketStatusId, commitStatus, statusColumnsConfig) {
        // console.log('ticketStatusId',ticketStatusId)
        // console.log('commitStatus',commitStatus)
        // console.log('statuscoonfig',statusColumnsConfig)
        let statusRow = new Array(6)

        let statusConfig = statusColumnsConfig[ticketStatusId]
        let col = statusConfig.column
        let icon = statusConfig.icon
        statusRow[col] = icon

        let gitCol = this.getGitStatus(commitStatus)
        if (col !== gitCol) {
            statusRow[gitCol] = '💔'
        }

        return statusRow;
    }

    getGitStatus(commitStatus) {
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
}

