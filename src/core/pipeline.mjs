// create a middleware pipeline
// TODO: code smell, hardcoding the middleware in the constructor
// should there be a pipeline factory?
export class Pipeline {
    constructor () {
        this.middlewares = []
        // this.handleIncomingMessages()
        //     .catch(err => console.error(err))
    }

    use (middleware) {
        this.middlewares.push(middleware)
    }

    async run (initialContext) {
        let context = initialContext
        //middlewares array called in sequence?
        for await (const middlewareFunc of this.middlewares) {
            context = await middlewareFunc.call(this, context)
        }
        return context
    }
}
