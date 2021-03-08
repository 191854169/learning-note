const intervalFactory = (kData, splitNumber) => {
    let cache = null
    return function() {
        if (!cache) {
            const maxPrice = Math.max.apply(null, kData.list.map(item => item.high))
            const minPrice = Math.min.apply(null, kData.list.map(item => item.low))
            const interval = ((maxPrice - minPrice)/ (splitNumber - 1) * 1.3).toFixed(2)
            cache = {
                min: minPrice,
                interval,
                max: ((splitNumber - 1) * interval) + minPrice,
            }
        }
        return cache
    }
}


class IntervalFactor {
    _cache = null
    _count = 0
    constructor() {
        console.log(this._cache)
    }

    get value() {
        return this._count
    }

    set value() {
        throw new Error('can not set value')
    }

    add() {
        this._count += 1
    }
}

const getInterval = intervalFactory()