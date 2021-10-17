import Conf from 'conf'
import {getConfig} from "./config.factory.mjs";
import {getGlobalConfig} from "../../state/global.config.mjs";
//the config file is stored locally in ~/Library/Preferences/<app name>
//if deleted, it will be recreated

export function configure() {
    let config = new Conf({projectName: 'racy'})

    let configJson = getConfig()
    // stores the configuration in a local file for app reuse in future if no env specified
    config.set(configJson);
    //TODO: rename singleton
    getGlobalConfig(configJson.config) //store config in global singleton
    return configJson
}
