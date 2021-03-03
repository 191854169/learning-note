class CreateFlow {
    constructor(fnc) {
        this.fncArr = fnc || []
    }

    add(it) {
        if (it instanceof CreateFlow) {
            this.fncArr.push(...it.fncArr)
            return
        }
        const _it = Array.isArray(it) ? it : [it]
        this.fncArr.push(..._it)
    }

    run() {
        while(this.fncArr.length) {
            const fnc = this.fncArr.shift()
            if (typeof fnc === 'function') {
                const res = fnc()
                if (res && res.then) {
                    res.then(() => createFlow(this.fncArr).run())
                    break
                }
            }
        }
    }
}

function createFlow(arr = []) {
    const flow = new CreateFlow()
    const flat = arr => arr.reduce((cur, it) => {
        if (Array.isArray(it)) {
            cur.push(...flat(it))
        } else {
            cur.push(it)
        }
        return cur
    }, [])
    flat(arr).forEach(item => {
        flow.add(item)
    })
    return flow
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => console.log("c"))]);

createFlow([
    () => console.log("a"),
    () => console.log("b"),
    subFlow,
    [() => delay(1000).then(() => console.log("d")), () => console.log("e")],
]).run(() => {
    console.log("done");
});



