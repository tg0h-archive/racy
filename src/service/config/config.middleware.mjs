import {configure} from './config.service.mjs'

//the env variable can be
// 1. passed in via cli eg abcd --env <environment>
// 2. set up in the environment, eg ABCD_ENV=dev abcd <command>

//this middleware is used by yargs, not by the abcd pipeline
export function setConfigMiddleware(argv) {
    if (argv.env) {
        let config = configure(argv.env)
        return config //the returned json object is appended to argv
    } else {
        // without any env, configure just returns the existing config
        let test = configure()
        return configure()
    }
}
