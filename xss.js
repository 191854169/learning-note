// const http = require('http')
// const fs = require('fs')
// const scriptFile = fs.readFileSync('./script.js', {
//     encoding: 'utf-8'
// })
// console.log(scriptFile)
// http  
// const instance = http.createServer((request, response) => {
//     console.log(request, response)
//     response.setHeader('content-type', 'application/json')
//     response.write(scriptFile)
//     response.end()
// }).listen('8086')

const net = require('net')
console.log(net)
console.log('process======>', process.execArgv, process.argv)
const domain = (process.argv.filter(item => /domain=.*/.test(item))[0] || '').match(/domain=(.+)/)[1]
console.log('domain======>', domain)


