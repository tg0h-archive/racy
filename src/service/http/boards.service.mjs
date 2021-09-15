import got from 'got'

const run = async () => {
    const {data} = await got.post('https://httpbin.org/anything', {
        json: {
            hello: 'world'
        }
    }).json();
    return data
}

export {run}
