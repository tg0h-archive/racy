const statusJoinBuilder = function (data, dicts) {
    let x = data
    let tickets = dicts.tickets

    // tickets.forEach((t) => {
    // console.log('t key', {key: t.key})
    // console.log('2862',tickets['ARG-2862'])
    // console.log('2896',tickets['ARG-2896'])
    // let keys = Object.keys(tickets)
    // console.log('keys',keys)
    // console.log('keys',keys.length)
    // for (const k in tickets) {
    //     console.log('k',k)
    // }
    // })

    // data.forEach((d) => {
    //     console.log('d key', {key: d.key, subtasks: d.fields.subtasks})
    // })

    let joined = data.map((ticket) => {
        //if parent, join to subtask
        let subtasks = ticket.fields.subtasks
        if (subtasks.length > 0) {
            let _subtasks = []
            // console.log('wow')
            subtasks.map((subtask) => {
                let key = subtask.key
                let fullSubTask = tickets[key]
                _subtasks.push(fullSubTask)
            })
            ticket._subtasks = _subtasks
            // console.log('ticket',ticket)
        } else {
            ticket._subtasks = []
        }
        // console.log('subtasks',subtasks)
        return ticket
    })

    // joined.forEach((j) => {
    //     console.log('j key', {
    //         key: j.key,
    //         subtasks: j.fields.subtasks,
    //         _subtasks: j._subtasks
    //     })
    // })
    // console.log('j size', joined.length)
    // console.log('joied is ',joined)
    let filtered = joined.filter((ticket) => {
        // console.log('ticket key',ticket.key)
        let subtask
        // console.log('issuetype',ticket.fields.issuetype.subtask)
        let isSubtask = ticket.fields.issuetype.subtask
        // if is subtask, return true to remove subtask
        // console.log('isSubtask',isSubtask)
        // console.log(typeof isSubtask)
        return !isSubtask
        // return false
    })

    // filtered.forEach((f) => {
    //     console.log('f key', {
    //         key: f.key,
    //         subtasks: f.fields?.subtasks.length,
    //         _subtasks: f._subtasks
    //     })
    // })
    // console.log('f size', filtered.length)
    // console.log('f size', filtered.length)
    return filtered;
}

export {statusJoinBuilder}
