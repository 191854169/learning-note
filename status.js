
const statusList = {
    passed: true,
    arr: [],
    strategies: {
        checkLogin: async function() {
            console.log(this)
            return new Promise((res) => {
                setTimeout(() => {
                    console.log('first')
                    res(false)
                }, 1000)
            })
        },
        checkGrayAuth: function()  {
            console.log(this)
            return new Promise((res) => {
                setTimeout(() => {
                    console.log('second')
                    res(true)
                }, 1000)
            })
        },
        checkMarketAccount: function() {
            return new Promise((res) => {
                setTimeout(() => {
                    console.log('third')
                    res(false)
                }, 1000)
            })
        },
        checkProAuth: function() {},
        checkRiskAssement: function() {},
        checkDaAccount: function() {}
    },
    setStrategy(strategyList) {
        // 重置
        this.arr.splice(0)
        this.arr = this.arr.concat(strategyList)
    },
    run() {
        if (!this.arr.length) return
        const fnc = this.strategies[this.arr.shift()]
        fnc && typeof fnc === 'function' && (fnc.call(this).then(res => {
            console.log(res); this.passed = res;
            if (this.passed) {
                this.run()
            }
        }))
    }
}

statusList.setStrategy(['checkGrayAuth', 'checkMarketAccount', 'checkLogin'])
statusList.run()



async function fnc() {
    await new Promise((res, rej) => {
        setTimeout(res, 2000)
    })
    console.log('-ggg-')
}
fnc()



