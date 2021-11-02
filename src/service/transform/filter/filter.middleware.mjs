import {filter} from './filter.service.mjs'

export async function filterMiddleware(ctx) {
    //only join if csv!! or special override flag?
    if (ctx.request.argv.format === 'csv') {
        // todo - middleware should only pass what the service needs
        filter(ctx) //todo join mutates the data - is this ok? or should it return data not change it
    }
    //todo  response.data metadata is no longer accurate after filter
    return ctx
}
