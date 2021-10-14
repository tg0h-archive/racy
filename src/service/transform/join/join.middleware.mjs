import {join} from './join.service.mjs'

export async function joinMiddleware(ctx) {
    //only join if csv!! or special override flag?
    if (ctx.request.argv.format === 'csv') {
        // todo - middleware should only pass what the service needs
        await join(ctx) //todo join mutates the data - is this ok? or should it return data not change it
    }
    return ctx
}
