import got from 'got'
import {authHeaderBuilder} from "./jiraHelper/authHeaderBuilder.mjs";

import {getGlobalConfig} from "../../../state/global.config.mjs";

const jiraGotter = async (params, method) => {
    let {url, username, password} = getGlobalConfig()
    let authHeaders = authHeaderBuilder(username, password)

    let {urlPath, payloadKey} = params;
    let fullUrl = url + params.urlPath

    let httpOptions = {headers: authHeaders}
    let json = params.json
    if (params.json) {
        httpOptions.json = json
    }

    let resp
    try {
        resp = await got[method](fullUrl, httpOptions)
        console.log('resp', resp.statusCode)
        console.log('resp', resp.statusMessage)
        // console.log('resp',resp.body)
    }
    catch(err){
        console.log('error',err)
        throw new Error(err)
    }


    let api = async (httpOptions) => {
        return await got[method](fullUrl, {headers: authHeaders, ...httpOptions}).json()
    }

    let responseBody = resp.body &&= JSON.parse(resp.body)
    let data = []
    if (payloadKey) {
        // eg a ticket edit put does not return a response body
        data = [...responseBody[payloadKey]]
    }

    let {isLast, nextStartAt} = getPaginationData(responseBody, 0)
    if (!isLast && responseBody && payloadKey) {
        let pages = await paginate(api, payloadKey, nextStartAt) //get the remaining pages
        data.push(...pages)
    }

    if (responseBody && !payloadKey) {
        throw new Error('no payload key given to paginate response body')
    }
    return data
}

async function paginate(api, payloadKey, nextStartAt) {
    let data = []
    let startAt = nextStartAt
    let resp
    let isLast = false
    try {
        while (!isLast) {
            let httpOptions = {searchParams: {startAt}}
            resp = await api(httpOptions)
            data.push(...resp[payloadKey]);
            ({isLast, nextStartAt} = getPaginationData(resp, startAt))
            startAt = nextStartAt
        }
        return data
    } catch (error) {
        //TODO: code smell catching and throwing errors
        throw new Error(error)
    }
}

function getPaginationData(responseBody, startAt) {
    let isLast = false
    let nextStartAt = startAt + responseBody.maxResults
    // either isLast or total may be undefined, use both to decide when to stop pagination
    isLast = responseBody.isLast || nextStartAt > responseBody.total

    return {nextStartAt, isLast}
}

export {jiraGotter}

