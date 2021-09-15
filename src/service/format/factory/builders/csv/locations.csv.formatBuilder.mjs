//es6 does not have a nested destructure import
import {Parser, transforms} from 'json2csv'
import yaml from 'js-yaml'
import {readFileSync} from 'fs'

const {unwind} = transforms

const locationsCsvFormatBuilder = function (items) {
    const url = new URL('./locations.csv.recipe.yaml',import.meta.url)
    const locationRecipe = yaml.load(readFileSync(url));

    const transform = [unwind({paths: locationRecipe.unwind})];
    const json2csvParser = new Parser({fields: locationRecipe.fields, transform});
    return json2csvParser.parse(items)
}

export {locationsCsvFormatBuilder}
