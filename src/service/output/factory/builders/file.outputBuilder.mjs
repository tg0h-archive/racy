//es6 does not have a nested destructure import
import fs from 'fs'

//todo - what if there was an out here in the function?
/**
 *  writes out to a file
 * @param out assumes that out is a string
 * @param outputFileName
 * @param format
 */
const fileOutputBuilder = function (out, outputFileName, format) {
    if (!outputFileName) {
        console.error('Error: outputFileName not provided')
    }

    let fileName = outputFileName.concat('.', format)
    fs.writeFile(fileName, out, err => {
        // callback is called if there is an error or when file is written
        if (err) {
            console.error(err)
        } else {
            console.log(`${fileName} was saved to current directory`)
        }
    })
}

export {fileOutputBuilder}
