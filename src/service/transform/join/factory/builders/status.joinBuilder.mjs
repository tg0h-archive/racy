const statusJoinBuilder = function (data, dicts) {
    let x = data
    // console.log('data',data[0])
    // console.log('dicts',dicts)
    let tickets = dicts.tickets
    let joined = data.map((ticket)=>{
       //if parent, join to subtask
        let subtasks = ticket.fields.subtasks
        if (subtasks.length > 0){
            let _subtasks = []
            // console.log('wow')
            subtasks.map((subtask)=>{
                let key = subtask.key
                let fullSubTask = tickets[key]
                _subtasks.push(fullSubTask)
            })
            ticket._subtasks = _subtasks
            // console.log('ticket',ticket)
        }
        // console.log('subtasks',subtasks)
        return ticket
    })
    let filtered = joined.filter((ticket)=>{
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
    return filtered;
}

export {statusJoinBuilder}
