const BaseMetricType = require('./base')

module.exports = class Gauge extends BaseMetricType {
    constructor (store, obj) {
        super(store, obj)
        this.values = new Map()
        this.value = 0
    }

    increment (labels, value) {
        const item = this.get(labels)
        this.set(labels, (item ? item.value : 0) + value)
    }

    decrement (value) {
        this.value -= value
    }

    generateSnapshot () {
        return Array.from(this.values).map(([labelString, item]) => {
            return {
                value: item.value,
                labels: item.labels
            }
        })
    }

    set (labels, value) {
        const labelString = this.stringifyLabels(labels)
        const item = this.values.get(labelString)
        this.value = value
        if (item) {
            if (item.value !== value) {
                item.labels = labels
                item.value = value
            }
        } else {
            const item = {
                labels: labels,
                value: value
            }
            this.values.set(labelString, item)
        }
        return item
    }
}
