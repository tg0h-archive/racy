import {sort} from './sort.service.mjs'

export function sortMiddleware(ctx){
    const {command} = ctx.request.argv
    const {data} = ctx.response

    //todo: pass sort options?
    let d = sort(command,data)
    ctx.response.data = d

    return ctx
}
