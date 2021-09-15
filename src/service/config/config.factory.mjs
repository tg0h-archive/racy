// https://www.dofactory.com/javascript/design-patterns/builder

import yaml from 'js-yaml'
import {readFileSync} from 'fs'

/***
 * Get the config file of the environment and return it in json
 * @param env
 * @returns {Promise<*>}
 */
function getConfig() {
    const config = yaml.load(readFileSync(new URL('../../../config/config.yml', import.meta.url)));
    return config
}

export {getConfig}
