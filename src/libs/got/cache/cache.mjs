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
        const value = await this.client.get(key);
        return value
    }

    async setKey(key, value, expiry) {
        let string = JSON.stringify(value)
        // TODO: this is expensive!
        expiry ? await this.client.setEx(key, expiry, string) : await this.client.set(key, string)
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
