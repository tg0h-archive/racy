import {statusSprintDemultiplexer} from "./status.sprint.demultiplexer.mjs";

const statusSprintDemultiplexerProxy = new Proxy({}, {
    get() {
// since a json formatter is a no-op, use a proxy to
// return the same passthrough function
// the proxy returns a jsonFormatBuilder for all gets
// eg, proxy.locations returns jsonFormatBuilder
// eg, proxy.timothy returns jsonFormatBuilder
        return statusSprintDemultiplexer
    }
})
export {statusSprintDemultiplexerProxy}

