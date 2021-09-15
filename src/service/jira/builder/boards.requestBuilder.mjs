const BoardsRequestBuilder = function ({
                                                organizationId, accountId, id,
                                                config: {
                                                    dynamoDb: {tableNamePrefix, tableNameSuffix}
                                                }
                                            }) {
    // todo - use functional programming to mix in behaviour
    // set up the table name in the factory instead
    // this.TableName = getTableName(tableNamePrefix, 'Locations', tableNameSuffix)
    this.ExpressionAttributeValues = {}
    if (organizationId) {
        this.method = 'query'
        this.IndexName = 'siteId-active-index'
        this.KeyConditionExpression = "siteId = :siteId"
        this.ExpressionAttributeValues[':siteId'] = organizationId

        this.KeyConditionExpression += " and active between :zero and :one"
        this.ExpressionAttributeValues[':zero'] = 0
        this.ExpressionAttributeValues[':one'] = 1
    } else if (accountId) {
        // this.IndexName = 'accountId-index'
        // this.KeyConditionExpression = "accountId = :accountId"
        // this.ExpressionAttributeValues[':accountId'] = accountId
    } else if (id) {
        this.method = 'query'
        this.KeyConditionExpression = "LocationID = :id"
        this.ExpressionAttributeValues[':id'] = id
    }

}

export {BoardsRequestBuilder}
