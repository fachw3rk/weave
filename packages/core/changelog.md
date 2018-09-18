# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.5.2"></a>
## 0.5.2 (2018-09-18)

**Note:** Version bump only for package @weave-js/core





<a name="0.5.1"></a>
## 0.5.1 (2018-09-18)

**Note:** Version bump only for package @weave-js/core





<a name="0.5.0"></a>
# 0.5.0 (2018-09-18)

**Note:** Version bump only for package @weave-js/core





<a name="0.5.0"></a>
# 0.5.0 (2018-09-17)

**Note:** Version bump only for package @weave/weave-core





<a name="0.5.0"></a>
# [0.5.0]() (2018-09-05)

# Breaking Changes

Changed the interface of the module. The weave factory method is now provided as a property of the module.

```js
    const { Weave, Errors, TransportAdapters, Constants } = require('weave-core')

    const broker = Weave({
        nodeId: 'node-1',
        transport: TransportAdapters.Fake()
    })
```

# New


## Service watcher

Weave now supports hot reload of services. When weave detects a change in a service file, it stops the service, removes it from internal and external registries and restarts the service with the changes without stopping the node. 

```js
    const broker = Weave({
        nodeId: 'node-1',
        watchServices: true
    })
```

### weave runner example

```bash
    weave-runner services -W
```

## Support for streams

Streaming support has been implemented. Node.js streams can be transferred as params or as response. You can use it to transfer uploaded file from a gateway or encode/decode or compress/decompress streams.

### Send file example

```js
    const fileStream = fs.createReadStream(fileName)

    broker.call('storage.save', stream, { meta: { filename }})
```

### Receive file example

```js
    const fileStream = fs.createWriteStream(fileName);

    broker.createService({
        name: 'storage',
        actions: {
            save (context) {
                const fileStream = fs.createWriteStream(`/temp/${context.meta.filename}`)
                context.params.pipe(fileStream)                
            }
        }
    })
```

### Recturn stream example

```js
    const fileStream = fs.createWriteStream(fileName);

    broker.createService({
        name: 'storage',
        params: {
            filename: { type: 'string' }
        }
        actions: {
            save (context) {
                return fs.createReadStream(context.params.filename)           
            }
        }
    })
```

## New beforeCreate hook for services

Added a new hook to intercept before service is created.

```js
module.exports = {
    name: 'math',
    actions: {
        ...
    },
    beforeCreate () {
        this.actions.newAction = {
            params: {...},
            handler (context) {...}
        }
    }
}
```
# Changes
## Changed Log level for heartbeat

The broker heartbeat is now only displayed at log level "trace".


<a name="0.4.0"></a>
# [0.4.0]() (2018-07-27)

# New
## Enhanced Middlewares

Middlewares are now on state of the art. You cann use a more detailed hook system to add features to your middlewares.

## New beforeCreate hook for services

Added a new hook to intercept before service is created.

```js
module.exports = {
    name: 'math',
    actions: {
        ...
    },
    beforeCreate () {
        this.actions.newAction = {
            params: {...},
            handler (context) {...}
        }
    }
}
```

<a name="0.3.0"></a>
# [0.3.0]() (2018-05-11)

# New
## NATS transporter

New Transporter for NATS.

## New beforeCreate hook for services

Added a new hook to intercept before service is created.

```js
module.exports = {
    name: 'math',
    actions: {
        ...
    },
    beforeCreate () {
        this.actions.newAction = {
            params: {...},
            handler (context) {...}
        }
    }
}
```


## Reconnect lost nodes
If a node1 get heartbeats from a actually disconnected node2. Node1 will send a discovery request to get the current infos from node2 and reconnect it.

# Fixed

## Cleanup for TCP Transporter

Old TCP-Mesh module removed.

--------------------------------------------------
<a name="0.2.19"></a>
# [0.2.19]() (2018-02-05)

# New

## Reconnect lost nodes
If a node1 get heartbeats from a actually disconnected node2. Node1 will send a discovery request to get the current infos from node2 and reconnect it.

# Fixed

## Cleanup for TCP Transporter

Old TCP-Mesh module removed.

--------------------------------------------------
<a name="0.2.18"></a>
# [0.2.19]() (2018-02-05)

# New

# Fixed

Fixed metrics finish method.

--------------------------------------------------

<a name="0.2.18"></a>
# [0.2.18]() (2018-02-05)

# New

# Fixed

Fixed metrics for action calls.

--------------------------------------------------
<a name="0.2.17"></a>
# [0.2.17]() (2018-01-28)

# New

## Add new service setting for private services.

If you set the property $private to true, the service is only reachable from the local node.

```js
module.exports = {
    name: 'math',
    mixins: [TestMixin],
    settings: {
        $private: true
    },
    actions: {
        add: {
            params: {
                a: { type: 'number' },
                b: { type: 'number' }
            },
            handler({ params }) {
                return params.a + params.b;
            }
        }
    }
}
```

## Add new internal action $node.list

List all connected nodes.

```js
[Node {
    id: 'testnode',
    local: true,
    client: {
        type: 'nodejs',
        version: '0.2.17',
        langVersion: 'v8.7.0'
    },
    cpu: null,
    lastHeartbeatTime: 1517162496548,
    isAvailable: true,
    services: null,
    events: null,
    IPList: ['192.168.178.21', '192.168.99.1']
} ]
```

## Add new internal action $node.actions

List all actions.

```js
[{
    name: '$node.services',
    hasAvailable: true,
    hasLocal: true,
    count: 1,
    action: {
        name: '$node.services',
        version: undefined
    }
},
{
    name: '$node.actions',
    hasAvailable: true,
    hasLocal: true,
    count: 1,
    action: {
        name: '$node.actions',
        version: undefined
    }
}]
```

# Fixed

Internal registry errors.

--------------------------------------------------
<a name="0.2.16"></a>
# [0.2.16]() (2018-01-22)

# New

## Add new cache features
In action cache, you now have the possibility to override the TTL. 

```js
module.exports = {
    name: 'example',
    actions: {
        show: {
            cache: {
                keys: ['name', 'site'],
                ttl: 5  // Set ttl to 5ms.
            }
        }
    }
}
```

--------------------------------------------------

<a name="0.2.15"></a>
# [0.2.15]() (2018-01-21)

# New

## Project runner script
There is a new weave project runner script in the bin folder. You can use it if you want to create small repositories for services. In this case you needn't to create a weave instance with options. Just create a weave.config.js or weave.config.json file in the root of repository, fill it with your options and call the weave-runner within the NPM scripts. As an other solution you can put it to the environment variables instead of putting options to file.


Example to start all services from the `services` folder.

```bash
$ weave-runner services
```


Example weave.config.js file with a REDIS transport, placed in the root of your project.

```js
const Weave = require('weave-core')

module.exports = {
    logLevel: 'debug',
    cacher: true,
    metrics: false,
    requestTimeout: 2000,
    transport: Weave.transports.Redis({
        host: process.env['REDIS_HOST']
    })
}

```

--------------------------------------------------

<a name="0.2.14"></a>
# [0.2.14]() (2018-01-20)

# New

## Add Changelog to project