import yaml from 'js-yaml'
import {readFileSync} from 'fs'

const url = new URL('./projectIds.data.yml',import.meta.url)
// TODO: is this cached?
const projectIds = yaml.load(readFileSync(url));

export {projectIds}
