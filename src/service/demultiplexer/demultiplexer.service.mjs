import {demultiplexerFactory} from "./factory/demultiplexer.factory.mjs";

const demultiplexer = async (argv) => {
    // todo if we want the service to be agnostic, then the request and response must be independent of the yargs and dynamodb argv structure
    try {
        // const ticketDemultiplexer = ticketDemultiplexerFactory(command)
        let command = argv.command
        let subCommand = argv.subCommand

        let demux = demultiplexerFactory(command, subCommand)
        const resp = await demux(argv);
        return resp
        // return join(data, dicts)
    } catch (err) {
        console.log("Error", err);
    }
};
export {demultiplexer}
