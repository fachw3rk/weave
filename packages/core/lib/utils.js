/*
 * Author: Kevin Ries (kevin@fachw3rk.de)
 * -----
 * Copyright 2018 Fachwerk
 */

const crypto = require('crypto')
const { defaultsDeep, assign } = require('lodash')
const os = require('os')

const lut = []
for (let i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + (i).toString(16)
}

const RegexCache = new Map()

module.exports = {
    generateToken () {
        const d0 = Math.random() * 0xffffffff | 0
        const d1 = Math.random() * 0xffffffff | 0
        const d2 = Math.random() * 0xffffffff | 0
        const d3 = Math.random() * 0xffffffff | 0
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
                lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
                lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
                lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff]
    },
    createId (length) {
        length = length || 12
        return crypto.randomBytes(length).toString('hex')
    },
    mergeSchemas (mixinSchema, serviceSchema) {
        function updateProp (propName, target, source) {
            if (source[propName] !== undefined) {
                target[propName] = source[propName]
            }
        }

        function mergeHook (parentValue, childValue) {
            if (childValue) {
                if (parentValue) {
                    if (Array.isArray(parentValue)) {
                        return parentValue.concat(childValue)
                    } else {
                        return [parentValue, childValue]
                    }
                } else {
                    if (Array.isArray(childValue)) {
                        return childValue
                    } else {
                        return [childValue]
                    }
                }
            }

            return childValue
                ? Array.isArray(parentValue)
                    ? parentValue.concat(childValue)
                    : Array.isArray(childValue)
                        ? childValue
                        : [childValue]
                : parentValue
        }

        const result = Object.assign({}, mixinSchema)
        const schema = Object.assign({}, serviceSchema)

        Object.keys(schema).forEach(key => {
            if (['settings'].includes(key)) {
                result[key] = defaultsDeep(schema[key], result[key])
            } else if (['actions', 'events', 'methods'].includes(key)) {
                result[key] = assign(result[key], schema[key])
            } else if (['started', 'stopped', 'created'].includes(key)) {
                if ((typeof result[key] === 'function' || Array.isArray(result[key])) && (typeof schema[key] === 'function' || Array.isArray(schema[key]))) {
                    result[key] = mergeHook(result[key], schema[key])
                } else {
                    result[key] = schema[key]
                }
            } else {
                updateProp(key, result, schema)
            }
        })

        return result
    },
    bytesToSize (bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return '0 Byte'
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
    },
    promiseTimeout (ms, promise, error = null) {
        let id
        const timeout = new Promise((resolve, reject) => {
            id = setTimeout(() => {
                clearTimeout(id)
                reject(error)
            }, ms)
        })
        // Returns a race between our timeout and the passed in promise
        return Promise.race([
            promise,
            timeout
        ]).then((result) => {
            clearTimeout(id)
            return result
        })
    },
    promiseDelay (promise, ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(promise)
            }, ms)
        })
    },
    delay: ms => new Promise(_ => setTimeout(_, ms)),
    getIpList () {
        const list = []
        const interfaces = os.networkInterfaces()
        for (const iface in interfaces) {
            for (const i in interfaces[iface]) {
                const f = interfaces[iface][i]
                if (f.family === 'IPv4' && !f.internal) {
                    list.push(f.address)
                    break
                }
            }
        }
        return list
    },
    match (text, pattern) {
        // Simple patterns
        if (pattern.indexOf('?') === -1) {
            // Exact match (eg. 'prefix.event')
            const firstStarPosition = pattern.indexOf('*')
            if (firstStarPosition === -1) {
                return pattern === text
            }

            // Eg. 'prefix**'
            const len = pattern.length
            if (len > 2 && pattern.endsWith('**') && firstStarPosition > len - 3) {
                pattern = pattern.substring(0, len - 2)
                return text.startsWith(pattern)
            }

            // Eg. 'prefix*'
            if (len > 1 && pattern.endsWith('*') && firstStarPosition > len - 2) {
                pattern = pattern.substring(0, len - 1)
                if (text.startsWith(pattern)) {
                    return text.indexOf('.', len) === -1
                }
                return false
            }

            // Accept simple text, without point character (*)
            if (len === 1 && firstStarPosition === 0) {
                return text.indexOf('.') === -1
            }

            // Accept all inputs (**)
            if (len === 2 && firstStarPosition === 0 && pattern.lastIndexOf('*') === 1) {
                return true
            }
        }

        // Regex (eg. 'prefix.ab?cd.*.foo')
        let regex = RegexCache.get(pattern)
        if (regex == null) {
            if (pattern.startsWith('$')) {
                pattern = '\\' + pattern
            }
            pattern = pattern.replace(/\?/g, '.')
            pattern = pattern.replace(/\*\*/g, '.+')
            pattern = pattern.replace(/\*/g, '[^\\.]+')

            pattern = '^' + pattern + '$'

            // eslint-disable-next-line security/detect-non-literal-regexp
            regex = new RegExp(pattern, 'g')
            RegexCache.set(pattern, regex)
        }
        return regex.test(text)
    }
}