import {dictsFactory} from "./factory/dictsFactory.mjs";

const lookup = async (data, argv) => {
    try {
        let command = argv.command
        if (!command) throw Error('no command given to lookup service')
        return await dictsFactory(command, argv, data)
    } catch (err) {
        console.log("Error", err);
    }
};
export {lookup}
