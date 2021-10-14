const LocationsFilterBuilder = function (data) {
    data.Items = data.Items.filter((item) => {
            // remove checkpoint locations, only return locations without parentId
            let isCheckpoint = item.parentId
            return !isCheckpoint
        }
    )
    return data;
}

export {LocationsFilterBuilder}
