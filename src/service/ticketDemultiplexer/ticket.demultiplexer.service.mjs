import {ticketDemultiplexerFactory} from "./factory/ticket.demultiplexer.factory.mjs";

const ticketDemultiplexer = async (argv) => {
    // todo if we want the service to be agnostic, then the request and response must be independent of the yargs and dynamodb argv structure
    try {
        // const ticketDemultiplexer = ticketDemultiplexerFactory(command)
        let ticketSubCommand = argv.subCommand
        let demux = ticketDemultiplexerFactory(ticketSubCommand)
         await demux(argv);

        // return join(data, dicts)
    } catch (err) {
        console.log("Error", err);
    }
};
export {ticketDemultiplexer}
