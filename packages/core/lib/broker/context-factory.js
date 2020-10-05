/*
 * Author: Kevin Ries (kevin@fachw3rk.de)
 * -----
 * Copyright 2020 Fachwerk
 */
'use strict'

const createContext = require('./context')

const createContextFactory = () => ({
  init (broker) {
    this.broker = broker
  },
  create (endpoint, params, opts) {
    const context = createContext(this.broker, endpoint)

    opts = opts || {}
    context.setParams(params)
    context.nodeId = endpoint.node.id
    context.timeout = opts.timeout || 0
    context.retryCount = opts.retryCount
    context.options = opts

    // get external request id from options
    if (opts.requestId) {
      context.requestId = opts.requestId
    } else if (opts.parentContext && opts.parentContext.requestId) {
      context.requestId = opts.parentContext.requestId
    }

    // meta data
    if (opts.parentContext && opts.parentContext.meta !== null) {
      context.meta = Object.assign({}, opts.parentContext.meta, opts.meta)
    } else if (opts.meta) {
      context.meta = opts.meta
    }

    // Parent context
    if (opts.parentContext != null) {
      context.parentId = opts.parentContext.id
      context.level = opts.parentContext.level + 1
      context.tracing = opts.parentContext.tracing
      context.span = opts.parentContext.span
    }

    if (context.metrics || context.nodeId !== this.broker.nodeId) {
      if (!context.requestId) {
        context.requestId = context.id
      }
    }

    return context
  },
  createFromPayload (payload) {
    const context = createContext(this.broker, { name: payload.action })

    context.nodeId = this.broker.nodeId
    context.id = payload.id
    context.setParams(payload.params)
    context.parentId = payload.parentId
    context.requestId = payload.requestId
    context.timeout = payload.timeout || 0
    context.meta = payload.meta
    context.metrics = payload.metrics
    context.level = payload.level
    context.callerNodeId = payload.sender

    return context
  }
})

module.exports = createContextFactory