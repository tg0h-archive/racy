const boardsHttpParamBuilder = function () {
    let http = this.http = {}
    http.urlPath = "/rest/agile/1.0/board"
    // this.urlPath = "/rest/api/3/dashboard"
    http.payloadKey = "values"
    http.method = "get"

    this.cache= {}
    this.cache.ttl = '604800' //specify cache in seconds
}

export {boardsHttpParamBuilder}
