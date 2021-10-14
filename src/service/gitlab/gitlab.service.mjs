import {config} from '../../../config/config.mjs'
import {gotFactory} from "../../libs/got/factory/got.factory.mjs";
import {paramFactory} from "./factory/gitlabParam.factory.mjs";

const jira = async (argv) => {
    let {url,token} = argv.config.gitlab
    let command = argv._[0]
    // params contain the url path and the request body
    // code smell, passing all of argv to paramFactory
    const gitlabHttpParams = paramFactory(command, argv)

    try {
        let authConfig = {token}
        const resp = await gotFactory('gitlab')(url, authConfig, gitlabHttpParams)
        return resp
    } catch (error) {
        console.error('error', error)
    }
}

export {jira}
