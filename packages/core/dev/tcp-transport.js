const { Weave, TransportAdapters } = require('../lib/index.js')
// Create broker #1

const broker1 = Weave({
    nodeId: 'tcp-1',
    transport: {
        type: 'tcp',
        options: {
            urls: [
                'tcp://localhost:1234/tcp-1',
                'tcp://localhost:1235/tcp-2'
            ]
        }
    },
    logger: console,
    logLevel: 'debug',
    preferLocal: false,
    cacher: true,
    registry: {
        // preferLocal: false
    }
})

const broker2 = Weave({
    nodeId: 'tcp-2',
    transport: {
        type: 'tcp',
        options: {
            urls: [
                'tcp://localhost:1235/tcp-2',
                'tcp://localhost:1234/tcp-1'
            ]
        }
    },
    logger: console,
    logLevel: 'debug',
    preferLocal: false,
    cacher: true,
    registry: {
        // preferLocal: false
    }
})

broker1.createService({
    name: 'test',
    actions: {
        hello: {
            cache: {
                keys: ['name']
            },
            params: {
                name: { type: 'string' }
            },
            handler (context) {
                return 'Hello ' + context.params.name
            }
        }
    },
    hooks: {
        before: {
            'hello': [
                function (context, result) {
                    this.log.debug('testmessage')
                    this.log.debug('before1')
                },
                function (context, result) {
                    this.log.debug('before2')
                },
                'test'
            ]
        }
    },
    methods: {
        test () {
            this.log.debug('testmessage')
        }
    }
})

Promise.all([
    broker1.start(),
    broker2.start()
]).then(() => {
    setInterval(() => {
        broker1.call('test.hello', { name: 'John Doe' })
            .then(function (result) {
                broker1.log.debug(result)
            })
    }, 500)
})
