// 'use strict'

// const observe = {
//     callback: {},
//     $on(name, callback) {
//         if (typeof callback !== 'function') {
//             throw new Error('callback需要为函数')
//         }
//         if (!this.callback[name]) {
//             this.callback[name] = []
//         }
//         this.callback[name].push(callback)
//     },

//     $emit(name, data) {
//         const execs = this.callback[name]
//         if (Array.isArray(execs) && execs.length > 0) {
//             execs.forEach(exec => {
//                 exec(data)
//             })
//         }
//     }
// }

// function foo(a, b) {
//     console.log('start')
//     observe.$on('publish', () => {
//         console.log(a, b, this === global)
//     })
// }

// foo()

// observe.$emit('publish', 123)


// const getList = () => {
//     const list = Array.from({length: 8}).map((item, idx) => idx + 1)
//     const allComp = []
//     const arr = {}
//     const res = {
//         0: [],
//         1: [],
//         2: [],
//         3: [],
//         4: [],
//         5: [],
//         6: [],
//         7: []
//     }
//     for(let i = 0; i < list.length; i++) {
//         const a = list[i]
//         for (let j = 0; j < list.length; j++) {
//             const b = list[j]
//             const tempArr = (arr[a] = arr[a] || [])
//             if (a !== b) {
//                 if (!allComp.includes(`${a},${b}`) && !allComp.includes(`${b},${a}`)) {
//                     tempArr.push(`${a},${b}`)
//                     allComp.push(`${a},${b}`)
//                 }
//             }
//         }
//     }
//     for (let i = 0; i < arr[1].length; i++ ) {
//         const curRes = res[i]
//         while(curRes.length < 4) {
//             // curRes.push()
//         }
//     }
// }
// console.log(getList())

const validator = require('validator')
const res = validator.isEmail('qq@qq.com')
console.log(res)