const { Weave } = require('../lib/index.js')
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
    cache: true,
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
    cache: true,
    registry: {
        // preferLocal: false
    }
})

broker2.createService({
    name: 'math',
    actions: {
        hello: {
            params: {
                name: { type: 'string' }
            },
            handler (context) {
                return 'Hello ' + context.params.name
            }
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