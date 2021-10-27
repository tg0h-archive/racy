import {lookup} from './lookup.service.mjs'

// what does the get middleware pass to the get service?
// middleware only passes what the service needs, no more no less
// what is the responsibility of the the lookup middleware ??
// it decides how to mutate 😁 (big word) the context
// in this case, it has added a new namespace to the reponse
export async function lookupMiddleware(ctx){
    // console.log('lookup argv',ctx.request.argv)
    const argv = ctx.request.argv
    //TDO: CODE SMELL - what should the middleware pass to the get service?
    // passing too much data is a code smell?
    // i should only pass in what the get service needs?
    let data = await lookup(ctx.response.data, argv)
    ctx.response.dicts = data

    return ctx
}
