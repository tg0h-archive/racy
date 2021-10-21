import {createClient} from 'redis';
import {getGlobalConfig} from "../../../state/global.config.mjs";

let config = {
    socket: {
        host: 'localhost',
        port: 6379,
    },
    username: undefined,
    password: undefined,
    // redis database number to connect to
    database: 0
}

class Cache {
    constructor() {
        // let x = getGlobalConfig()
        // console.log('x',x)
        // let redis

        // override the global config with the passed in keys
        // console.log('cache constructed! ###########################')
        this.config = config;
        this.client = createClient(config);
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        this.date = new Date();
    }

    async connect() {
        await this.client.connect()
    }

    async getKey(key) {
        // TODO: this is expensive!
        // console.log('this client',this.client)
        // await this.client.connect();
        const value = await this.client.get(key);
        // await this.client.quit();
        return value
    }

    async setKey(key, value, expiry) {
        let string = JSON.stringify(value)
        // console.log('string',string)
        // TODO: this is expensive!
        // await this.client.connect();
        // await this.client.setEx(key, expiry, string)
        expiry ? await this.client.setEx(key, expiry, string) : await this.client.set(key, string)
        // this.client.quit()
    }

    async close() {
        await this.client.quit()
    }
}

export const cache = new Cache()

// export async function getCache () {
// //TODO: is this a singleton?
//     let c = new Cache()
//     await c.connect()
//     return c
// }
