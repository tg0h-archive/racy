import {config} from '../../../config/config.mjs'
import {gotFactory} from "../../libs/got/factory/got.factory.mjs";
import {paramFactory} from "./factory/httpParam.factory.mjs";

const jira = async (argv) => {
    let {url} = argv.config
    let command = argv._[0]
    // params contain the url path and the request body
    // code smell, passing all of argv to paramFactory

    // default cche ttl to 1 hour if none provided by paramFactory
    const {http, cache = {ttl: 3600}} = paramFactory(command, argv)

    try {
        let authConfig = {username: config.username, password: config.password}
        // const resp = await gotFactory('jira')(url, authConfig, httpParams)
        let jiraGotter = gotFactory('jira')
        // todo: get is hardcoded :|
        const resp = await jiraGotter(http, 'get', cache)
        return resp
    } catch (error) {
        console.error('error', error)
    }
}

export {jira}
