import {jira} from './jira.service.mjs'

//what does the get middleware pass to the jira service?
export async function gitlabMiddleware(ctx){
    const argv = ctx.request.argv
    let data = await jira(argv)
    ctx.response.data = data

    return ctx
}
