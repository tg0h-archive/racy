import {config} from '../../../config/config.mjs'
import {gotFactory} from "../../libs/got/factory/got.factory.mjs";
import {paramFactory} from "./factory/gitlabParam.factory.mjs";
// import {curry} from 'ramda'

// ability to delay the api call - return a function instead of calling for me

const gitlab = async (command, attributes) => {
    const {http, cache = {ttl: 3600}} = paramFactory(command, attributes)

    try {
        const resp = await gotFactory('gitlab')(http, 'get', cache)
        return resp
    } catch (error) {
        console.error('error', error)
    }
}

export {gitlab}
