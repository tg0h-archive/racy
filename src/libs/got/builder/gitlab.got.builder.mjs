import got from 'got'
import {getGlobalConfig} from "../../../state/global.config.mjs";

const gitlabGotter = async (params, method) => {
    // console.log('inside gitlab gotter')
    let {urlPath, payloadKey} = params;
    let {gitlab: {url, token}} = getGlobalConfig()
    let x = getGlobalConfig()
    let authHeaders = {"PRIVATE-TOKEN": token}
    let fullUrl = url + params.urlPath
    let data = []
    let resp

    try {
        resp = await got[method](fullUrl, {headers: authHeaders})
        // console.log('resp',resp.statusCode)
        // console.log('resp',resp.statusMessage)
        let responseBody = resp.body &&= JSON.parse(resp.body)
        if (payloadKey) {
            data.push(...responseBody[payloadKey])
        } else {
            data = responseBody
        }
        return data
    } catch (error) {
        // console.error('error', error)
    }
}

export {gitlabGotter}

