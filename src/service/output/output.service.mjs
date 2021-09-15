import {outputFactory} from "./factory/output.factory.mjs";

const output = (out, argv) => {
    let {output: outputFileName, format} = argv

    let outputType = outputFileName ? 'file' : 'stdout'
    try {
        // todo should this be done by the output function or by the factory?
        // do this in which level?
        if (typeof out !== 'string' ) {
            out = JSON.stringify(out, ' ', 2)
        }

        let output = outputFactory(outputType, out)
        output(out, outputFileName, format)
    } catch (err) {
        console.log("Error", err);
    }
};
export {output}
