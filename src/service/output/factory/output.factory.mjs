// https://www.dofactory.com/javascript/design-patterns/builder
import {stdoutOutputBuilder} from "./builders/stdout.outputBuilder.mjs";
import {fileOutputBuilder} from "./builders/file.outputBuilder.mjs";

const outputBuilders = {
    stdout: stdoutOutputBuilder,
    file: fileOutputBuilder
}

function outputFactory(outputType) {
    return outputBuilders[outputType]
}

export {outputFactory}
