const http = require('http')

const serve = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end({
        hello: 'xixi'
    })
})

const instance = serve.listen('8089', '127.0.0.1', () => {
    console.log('listen on 127.0.0.1:8089')
})



serve.on('close', () => {
    console.log('close')
})

const list = []
res.forEach(o => {
    const temp = list.find(i => i.name === o.name && i.size === o.size)
    if (temp) {
        temp.path = o.directory
        temp.id = o.id
    }
})