import got from 'got'
import {getGlobalConfig} from "../../../state/global.config.mjs";

const gitlabGotter = async (params) => {
    let {urlPath, payloadKey} = params;
    // let {token} = authConfig;

    let {gitlab: {url, token}} = getGlobalConfig()
    let authHeaders = {"PRIVATE-TOKEN": token}

    let fullUrl = url + params.urlPath

    let data = []
    let startAt = 0
    let isLast = false
    let resp
    // let i=0
    try {
        // while (!isLast) {

        // console.log(`getting page ${i++} starting at ${startAt}`)
        // let searchParams = {startAt}

        // if (!payloadKey) throw new Error('no payload key found')

        // const {statusCode rawBody, body} = await got.get(url,
        resp = await got.get(fullUrl, {headers: authHeaders}).json()
        if (payloadKey) {
            data.push(...resp[payloadKey])
        } else {
            data = resp
        }
        // data.push(...resp[payloadKey])
        // startAt = startAt + resp.maxResults

        // let nextStartAt = startAt

        // either isLast or total may not be defined
        // we have to use both to decide when to stop pagination
        // isLast = resp.isLast || nextStartAt > resp.total
        // }
        // console.log('data',data)
        // console.log('data length',data.length)
        // if use use json() it converts the response body into a json object
        // if you do not use json(), you can view the statusCode, body etc
        return data
    } catch (error) {
        // console.error('error', error)
    }
}

export {gitlabGotter}

