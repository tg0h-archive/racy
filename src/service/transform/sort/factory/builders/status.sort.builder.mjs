import _ from "lodash";

const StatusSortBuilder = function (data) {
    // let item = data[0]
    // let id = item.id
    // let key = item.key
    // let epic = item.fields.epic
    // let epicId = item.fields.epic.id
    // let epicName = item.fields.epic.name
    // let sprint = item.fields.sprint
    // let components = item.fields.components
    // let componentsName = item.fields.components[0]?.name
    // console.log('item',item)
    // console.log([id, key, sprint, epic, components])
    // console.log([epicId, componentsName])

    const sortComponent = (item)=>{
        let component = item.fields.components[0]?.name
        return component
    }
    data = _.sortBy(data, ['fields.epic.key',sortComponent])
    // data.forEach((d)=>{
    //     let eid = d.fields.epic?.id
    //     let ename = d.fields.epic?.name
    //     let cname = d.fields.components[0]?.name
    //     console.log([eid,ename,cname])
    // })

    return data;
}

export {StatusSortBuilder}
