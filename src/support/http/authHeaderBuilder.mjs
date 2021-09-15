import {config} from '../../../config/config.mjs'

const username = config.username
const password = config.password

// https://github.com/sindresorhus/got/issues/1383
// got does not support basic auth due to node bug
const headers = {
    Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString("base64")
};

export {headers}
