/*
 * Author: Kevin Ries (kevin@fachw3rk.de)
 * -----
 * Copyright 2018 Fachwerk
 */

const { omit } = require('fachwork')

module.exports = ({ health }) => {
    return {
        name: '$node',
        actions: {
            services: {
                handler () {
                    const results = []
                    const services = this.broker.registry.getServiceList({ withActions: true })
                    services.forEach(service => {
                        let item = results.find(result => result.name === service.name && result.version === service.version)
                        if (item) {
                            item.nodes.push(service.nodeId)
                            if (service.actions) {
                                item.actions = {}
                                Object.keys(service.actions).forEach(actionName => {
                                    const action = service.actions[actionName]
                                    if (!item.actions[actionName]) {
                                        item.actions[actionName] = omit(action, ['handler', 'service'])
                                    }
                                })
                            }
                        } else {
                            item = {
                                name: service.name,
                                version: service.version
                            }
                            item.nodes = [service.nodeId]
                            if (service.actions) {
                                item.actions = {}
                                Object.keys(service.actions).forEach(actionName => {
                                    const action = service.actions[actionName]
                                    item.actions[actionName] = omit(action, ['handler', 'service'])
                                })
                            }
                            results.push(item)
                        }
                    })
                    return results
                }
            },
            actions: {
                handler (context) {
                    return this.broker.registry.getActionList(context.params)
                }
            },
            events: {
                handler (context) {
                    return this.broker.registry.getEventList(context.params)
                }
            },
            health: {
                handler () {
                    return health.getNodeHealthInfo()
                }
            },
            list: {
                handler (context) {
                    return this.broker.registry.getNodeList(context.params)
                }
            }
        }
    }
}
