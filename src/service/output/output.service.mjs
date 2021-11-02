import {outputFactory} from "./factory/output.factory.mjs";

const output = (view,  argv) => {
    let {output: outputFileName, format} = argv

    let outputType = outputFileName ? 'file' : 'stdout'
    try {
        // todo should this be done by the output function or by the factory?
        // do this in which level?
        if (typeof view !== 'string' ) {
            view = JSON.stringify(view, ' ', 2)
        }

        let output = outputFactory(outputType, view)
        output(view, outputFileName, format)
    } catch (err) {
        throw new Error(err)
    }
};
export {output}
