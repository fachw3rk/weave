/*
 * Author: Kevin Ries (kevin@fachw3rk.de)
 * -----
 * Copyright 2018 Fachwerk
 */

const { cpuUsage } = require('fachwork')

const createNode = (nodeId) => {
  return {
    id: nodeId,
    info: null,
    isLocal: false,
    client: null,
    cpu: null,
    cpuSequence: null,
    lastHeartbeatTime: Date.now(),
    offlineTime: null,
    isAvailable: true,
    services: [],
    sequence: 0,
    events: null,
    IPList: [],
    update (payload, isReconnected) {
      const newSequence = payload.sequence || 1

      this.services = payload.services
      this.events = payload.events
      this.client = payload.client || {}
      this.IPList = payload.IPList || []

      if (newSequence > this.sequence || isReconnected) {
        this.sequence = newSequence
        this.offlineTime = null

        return true
      }
      return false
    },
    updateLocalInfo () {
      cpuUsage().then(result => {
        const newVal = Math.round(result.avg)

        if (this.cpu !== newVal) {
          this.cpu = Math.round(result.avg)
          this.cpuSequence++
        }
      })
    },
    heartbeat (payload) {
      if (!this.isAvailable) {
        this.isAvailable = true
        this.offlineTime = Date.now()
      }

      this.lastHeartbeatTime = Date.now()
      this.cpu = payload.cpu
      this.cpuSequence = payload.cpuSequence || 1
    },
    disconnected () {
      if (this.isAvailable) {
        this.offlineTime = Date.now()
        this.sequence++
      }

      this.isAvailable = false
    }
  }
}

module.exports = createNode
