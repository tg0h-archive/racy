import {demultiplexer} from "./demultiplexer.service.mjs";

export async function demultiplexerMiddleware(ctx){
    let argv = ctx.request.argv
    // TODO: data isn't a good name when the api call is an update and not a get?
    let data = await demultiplexer(argv)
    ctx.response.data = data
    // the command may require multiple calls to the jira service
    // this middleware mediates btw the command and jira
    // const argv = ctx.request.argv
    // let data = await jira(argv)
    // ctx.response.data = data
    return ctx
}
