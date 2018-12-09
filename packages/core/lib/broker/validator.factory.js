/*
 * Author: Kevin Ries (kevin@fachw3rk.de)
 * -----
 * Copyright 2018 Fachwerk
 */

const ObjectValidator = require('fw-object-validator')

const makeValidator = ({ Errors }) => {
    const self = Object.create(null)
    const validator = ObjectValidator()

    self.compile = schema => validator.compile(schema)

    self.validate = (obj, schema) => {
        return validator.validate(obj, schema)
    }

    self.addRule = (type, ruleFn) => validator.addRule(type, ruleFn)

    self.middleware = () => {
        return function (handler, action) {
            if (action.params && typeof action.params === 'object') {
                const validate = self.compile(action.params)
                return context => {
                    const result = validate(context.params)
                    if (result === true) {
                        return handler(context)
                    } else {
                        return Promise.reject(new Errors.WeaveParameterValidationError('Parameter validation error', null, result))
                    }
                }
            }
            return handler
        }
    }
    return self
}

module.exports = makeValidator