import {gitlab} from "./gitlab.service.mjs";

export async function gitlabMiddleware(ctx){
    const argv = ctx.request.argv
    let data = await gitlab(argv)
    ctx.response.data = data

    return ctx
}
