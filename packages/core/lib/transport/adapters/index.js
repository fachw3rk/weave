/*
 * Author: Kevin Ries (kevin@fachw3rk.de)
 * -----
 * Copyright 2018 Fachwerk
 */

const { WeaveBrokerOptionsError } = require('../../errors')

const adapters = {
    BaseAdapter: require('./transport-base'),
    Redis: require('./redis'),
    NATS: require('./nats'),
    Fake: require('./fake'),
    TCP: require('./tcp')
}

const getAdapterByName = name => {
    if (!name) {
        return
    }
    const foundAdapterName = Object.keys(adapters).find(adapter => adapter.toLowerCase() === name.toLowerCase())
    if (foundAdapterName) {
        return adapters[foundAdapterName]
    }
}

const resolve = options => {
    if (typeof options === 'object') {
        if (options.type !== 'string' && options.options !== undefined) {
            const Adapter = getAdapterByName(options.type)

            if (Adapter) {
                return Adapter(options.options)
            } else {
                throw new WeaveBrokerOptionsError(`Invalid transport settings: ${options.type}`, { type: options.type })
            }
        }
        return options
    } else if (typeof options === 'string') {
        let Adapter = getAdapterByName(options)

        if (Adapter) {
            return Adapter()
        }

        if (options.startsWith('fake://')) {
            Adapter = adapters.Fake
        } else if (options.startsWith('redis://')) {
            Adapter = adapters.Redis
        } else if (options.startsWith('nats://')) {
            Adapter = adapters.NATS
        }

        if (Adapter) {
            return Adapter(options)
        } else {
            throw new WeaveBrokerOptionsError(`Invalid transport settings: ${options}`, { type: options })
        }
    }
    return null
}

module.exports = Object.assign({ resolve }, adapters)