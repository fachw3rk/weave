const { Weave } = require('../../lib/index')
const ServiceHookMixin = require('./mixins/service-hook.mixin')
const hasServiceScope = require('./scope-checks/service.scope')

const names = ['Kevin', 'John', 'Sarah']

const fetchName = jest.fn()
const log = jest.fn()

describe.only('Action hooks', () => {
    const broker = Weave({
        name: 'test-node',
        logLevel: 'fatal'
    })

    broker.createService({
        name: 'greeter',
        hooks: {
            before: {
                '*': log,
                sayHello: fetchName
            }
        },
        actions: {
            sayHello: {
                params: {
                    id: 'number'
                },
                handler (context) {
                    return `hello`
                }
            },
           
        },
        methods: {
            fetchName
        }
    })

    beforeAll(() => broker.start())
    afterAll(() => broker.stop())


    it('should call a before wildcard hock.', () => {
        return broker.call('greeter.sayHello', { id: 1 })
            .then(res => {
                expect(log).toBeCalledTimes(1)
            })
    })

    it('should call a before hock by action name.', () => {
        return broker.call('greeter.sayHello', { id: 1 })
            .then(res => {
                expect(fetchName).toBeCalledTimes(2)
            })
    })

    
})