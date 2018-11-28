/*
 * Author: Kevin Ries (kevin@fachw3rk.de)
 * -----
 * Copyright 2018 Fachwerk
 */

const TransportBase = require('../transport-base')
const MessageTypes = require('../../message-types')
const EventEmitter = require('eventemitter2').EventEmitter2

// create a global eventbus to pass messages between weave service brokers.
global.bus = new EventEmitter({
    wildcard: true,
    maxListeners: 100
})

const FakeTransporter = (options) => {
    const self = TransportBase(options)

    self.bus = global.bus
    self.state = 'ready'

    self.connect = (isTryReconnect = false) => {
        self.emit('adapter.connected', false)
        return Promise.resolve()
    }

    self.close = () => {
        return Promise.resolve()
    }

    self.send = (message) => {
        const data = self.serialize(message)
        const topic = self.getTopic(message.type, message.targetNodeId)
        self.bus.emit(topic, data)
        return Promise.resolve()
    }

    self.subscribe = (type, nodeId) => {
        const topic = self.getTopic(type, nodeId)
        self.bus.on(topic, message => self.incommingMessage(type, message))
    }

    return self
}

module.exports = FakeTransporter
