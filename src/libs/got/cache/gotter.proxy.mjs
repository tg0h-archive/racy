import {jiraGotter} from "../builder/jira.got.builder.mjs";
import {gitlabGotter} from "../builder/gitlab.got.builder.mjs";
import {getGlobalConfig} from "../../../state/global.config.mjs";
import {cache} from "./cache.mjs";


export function createGotterProxy(gotter) {
    // returns a proxy that tries to use the cache if the cache is defined in config
    let config = getGlobalConfig()
    if (config.redis) {
        return proxy(gotter)
    } else {
        return gotter
    }
}


function proxy(gotter) {
    return async (params, method, cacheOptions) => {
        let {ttl, reload} = cacheOptions
        let data;
        if (method === 'get') {
            let key = params.urlPath
            let c = cache.client
            let cacheValue = await cache.getKey(key)
            data = JSON.parse(cacheValue)
            if (data) {
                return data
            } else {
                data = await gotter(params, method)
                cache.setKey(key, data, ttl)
            }
        } else {
            data = gotter(params, method)
        }
        return data
    }
}

