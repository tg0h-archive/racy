// only stores the hardcoded config
// make this global so that it can be accessible by classes that are deep down
class GlobalConfig {
    constructor(config) {
        this.config = config
    }

    static getInstance(config){
       if (!GlobalConfig.instance) {
           GlobalConfig.instance = new GlobalConfig(config)
       }
       return GlobalConfig.instance.config
    }
}

let _config
function getGlobalConfig (config){
    if (!_config){
        _config = config
    }
    return _config
}

export {getGlobalConfig}
