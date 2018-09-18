const { Weave, TransportAdapters } = require('../lib/index.js')

const broker1 = Weave({
    nodeId: 'node-1',
    transport: TransportAdapters.Fake(),
    logger: console,
    logLevel: 'debug',
    preferLocal: false,
    registry: {
        // preferLocal: false
    }
})

broker1.createService({
    name: 'test',
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
// Create broker #2
const broker2 = Weave({
    nodeId: 'node-2',
    transport: TransportAdapters.Fake(),
    logger: console,
    registry: {
        // preferLocal: false
    }
})

Promise.all([
    broker1.start(),
    broker2.start()
]).then(() => {
    setInterval(() => {
        broker1.call('test.hello', { name: 'John Doe' })
            .then(result => console.log(result))
            .catch(error => console.log(error))
    }, 1000)
})
