/*
 * Author: Kevin Ries (kevin@fachw3rk.de)
 * -----
 * Copyright 2018 Fachwerk
 */
'use strict'

const addLocalServiceFactory = ({ state, registry }) =>
    (service, registryItem) => {
        state.services.push(service)
        registry.registerLocalService(registryItem)
    }

module.exports = addLocalServiceFactory