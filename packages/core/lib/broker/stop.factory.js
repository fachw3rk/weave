/*
 * Author: Kevin Ries (kevin@fachw3rk.de)
 * -----
 * Copyright 2018 Fachwerk
 */

const stopFactory = ({ state, log, transport, onClose }) =>
    () => {
        return Promise.resolve()
            .then(() => Promise.all(state.services.map(service => service.stop())))
            .catch(error => state.log.error('Unable to stop all services.', error))
            .then(() => {
                if (transport) {
                    return transport.disconnect()
                }
            })
            .then(() => {
                state.isStarted = false
                log.info(`Node successfully shutted down. Bye bye!`)
            })
            .then(() => {
                if (!state.isStarted) {
                    if (state.options.stopped) {
                        state.options.stopped.call(state)
                    }
                }
            })
    }

module.exports = stopFactory
