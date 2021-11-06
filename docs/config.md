# User Config

Path for the config file: `config/config.yml`

The config file lives in the Racy repo wherever node installs it.

I haven't figured out how to have it live in an os-specific path yet.

``` yml
# you can also specify your configuration via env variables of RACY_URL, RACY_USERNAME, etc to pass
# configuration to the racy cli
config:
  url: "https://something.atlassian.net"
  username: "your email address"
  password: "a token"
  gitlab:
    url: "https://your gitlab url/api/v4"
    token: "a gitlab token"
  redis:
    keyPrefix: 'racy'
    socket:
      host: 'localhost'
      port: 6379
#    username:
#    password:
    database: 0
```
