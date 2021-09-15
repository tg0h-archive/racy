import got from 'got'
import {config} from '../../../config/config.mjs'
import {headers} from '../../support/http/authHeaderBuilder.mjs'

let username = config.username
let password = config.password

const jira = async () => {
    let url = config.url + '/rest/agile/1.0/board/'
    try {
        // const {statusCodej rawBody, body} = await got.get(url,
        const resp = await got.get(url, {headers}
        ).json()
        // if use use json() it converts the response body into a json object
        // if you do not use json(), you can view the statusCode, body etc
        return resp
    } catch (error) {
        console.error('error', error)
    }
}

export {jira}
