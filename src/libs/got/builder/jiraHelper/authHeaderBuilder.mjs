
// https://github.com/sindresorhus/got/issues/1383
// got does not support basic auth due to node bug
const authHeaderBuilder = (username, password) => {
    return {Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString("base64")}
};

export {authHeaderBuilder}
