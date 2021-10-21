import got from 'got'
import {authHeaderBuilder} from "./jiraHelper/authHeaderBuilder.mjs";

import {getGlobalConfig} from "../../../state/global.config.mjs";

const jiraGotter = async (params, method) => {
    let {url, username, password} = getGlobalConfig()
    let {urlPath, payloadKey} = params;
    let fullUrl = url + params.urlPath
    let authHeaders = authHeaderBuilder(username, password)

    let data = []
    let startAt = 0
    let isLast = false
    let resp
    // let i=0
    try {
        while (!isLast) {

            // console.log(`getting page ${i++} starting at ${startAt}`)
            let searchParams = {startAt}

            if (!payloadKey) throw new Error('no payload key found')

            // const {statusCodej rawBody, body} = await got.get(url,
            resp = await got[method](fullUrl, {headers: authHeaders, searchParams}).json()
            data.push(...resp[payloadKey])
            startAt = startAt + resp.maxResults

            let nextStartAt = startAt

            // either isLast or total may not be defined
            // we have to use both to decide when to stop pagination
            isLast = resp.isLast || nextStartAt > resp.total
        }
        // console.log('data',data)
        // console.log('data length',data.length)
        // if use use json() it converts the response body into a json object
        // if you do not use json(), you can view the statusCode, body etc
        return data
    } catch (error) {
        console.error('error', error)
    }
}

export {jiraGotter}

