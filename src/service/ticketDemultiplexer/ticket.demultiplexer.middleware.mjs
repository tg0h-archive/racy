import {ticketDemultiplexer} from "./ticket.demultiplexer.service.mjs";

export async function ticketDemultiplexerMiddleware(ctx){
    let argv = ctx.request.argv
    ticketDemultiplexer(argv)
    // the command may require multiple calls to the jira service
    // this middleware mediates btw the command and jira
    // const argv = ctx.request.argv
    // let data = await jira(argv)
    // ctx.response.data = data
    return ctx
}
