import {output} from './output.service.mjs'

//what does the get middleware pass to the get service?
export function outputMiddleware(ctx) {
    const argv = ctx.request.argv
    const format = ctx.request.format
    const view = ctx.response.view
    //TDO: CODE SMELL - what should the middleware pass to the get service?
    // passing too much data is a code smell?
    // i should only pass in what the get service needs?
    output(view, argv)

    return ctx
}
