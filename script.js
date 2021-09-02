// console.log('fff')

// alert('xss')


// console.log('start')
// setTimeout(() => {
//   console.log('timer1')
//   Promise.resolve().then(function() {
//     console.log('promise1')
//   })
// }, 10)
// setTimeout(() => {
//   console.log('timer2')
//   Promise.resolve().then(function() {
//     console.log('promise2')
//   })
// }, 10)
// setImmediate(() => {
//     console.log('immediate')
// })
// Promise.resolve().then(function() {
//   console.log('promise3')
// })
// console.log('end')

// setTimeout(() => {
//     console.log('timer1')
//     Promise.resolve().then(function() {
//       console.log('promise1')
//     })
//    }, 0)
//    process.nextTick(() => {
//     console.log('nextTick')
//     process.nextTick(() => {
//       console.log('nextTick')
//       process.nextTick(() => {
//         console.log('nextTick')
//         process.nextTick(() => {
//           console.log('nextTick')
//         })
//       })
//     })
//    })
const fs = require('fs')

setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 1000)
fs.readFile('./xss.js', (err, data) => {
    if (err) console.error(err)
    console.log('I/O callback')
    Promise.resolve().then(() => {
        console.log('promise4')
    })
    setImmediate(() => {
        console.log('Immediate 2')
    })
})
fs.readFile('./xss.js', (err, data) => {
    if (err) console.error(err)
    console.log('I/O callback 1')
    Promise.resolve().then(() => {
        console.log('promise5')
    })
    setTimeout(() => {
        console.log('timer4')
    })
})
// Promise.resolve().then(() => {
//     console.log('promise3')
// })
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)

setImmediate(name => {
    console.log('immediate ' + name)
}, 'chenf')