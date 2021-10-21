import {jiraGotter} from "../builder/jira.got.builder.mjs";
import {gitlabGotter} from "../builder/gitlab.got.builder.mjs";
import {getGlobalConfig} from "../../../state/global.config.mjs";
import {cache} from "./cache.mjs";


export function createGotterProxy(gotter) {
    // console.log('creating gotter proxy')
    // returns a proxy that tries to use the cache if the cache is defined in config
    let config = getGlobalConfig()
    if (config.redis) {
        // console.log('creating gotter')
        return proxy(gotter)
    } else {
        return gotter
    }
}


function proxy(gotter) {
    return async (params, method, cacheOptions) => {
        let {ttl, reload} = cacheOptions
        // console.log('params',params)
        // console.log('method',method)
        let data;
        if (method === 'get') {
            let key = params.urlPath
            let c = cache.client
            // console.log('cache date ',cache.date)
            let cacheValue = await cache.getKey(key)
            data = JSON.parse(cacheValue)
            // console.log(`getting ${key} from cache, data: ${data}`)
            if (data) {
                return data
            } else {
                data = await gotter(params, method)
                // console.log('data from gotter is ',gotter)
                cache.setKey(key, data, ttl)
            }
        } else {
            data = gotter(params, method)
        }
        return data
    }
}

