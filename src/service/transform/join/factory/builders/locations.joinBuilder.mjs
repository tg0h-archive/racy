const LocationsJoinBuilder = function (data, dicts) {
    data.Items = data.Items.map(function (item) {
        // logical and assignment &&=
        // map checkpoints only if left hand side LHS item.checkpoints is truthy
        // optional chaining operator .?
            item.checkpoints &&= item.checkpoints?.map((checkpointId) => {
                let checkpointLocation = dicts.locations[checkpointId] ?? checkpointId
                return checkpointLocation
            })
            return item
        }
    )
    return data;
}

export {LocationsJoinBuilder}
