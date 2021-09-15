import {format} from './format.service.mjs'

//what does the get middleware pass to the get service?
export async function formatMiddleware(ctx){
    const argv = ctx.request.argv
    //TDO: CODE SMELL - what should the middleware pass to the get service?
    // passing too much data is a code smell?
    // i should only pass in what the get service needs?
    ctx.response.out = await format(ctx)

    return ctx
}
