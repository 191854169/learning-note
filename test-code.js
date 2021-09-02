// Typeof 
var toString = v => {
    console.log(Object.prototype.toString.call(v))
}

var num = 1
toString(num)
var str = '2'
toString(str)
var boolean = false
toString(boolean)
var nullV = null
toString(nullV)
var undefinedV = undefined
toString(undefinedV)
var numObj = Number(1)
toString(numObj)
var strObj = String(2)
toString(strObj)
var arr = []
toString(arr)
var fuc = function() {}
toString(fuc)
// var obj = Object.create(Function.prototype)
// var obj = {}
var obj = Object.create(null)
toString(obj)
var map = new Map()
console.log(map instanceof Function)

console.log(typeof arr === 'object')


function foo() {
    let f
    console.log(f)
    f = 2
    console.log(doo)

    try {
        doo()
        function doo() {
            console.log('doo');
        }
    } catch (e) {
        console.error(e)
    }
}

foo()

// Prototype

a = {
    name: 'chenf',
    age: 20,
    hobby: 'woman',
    getSummary() {
        return `${this.name}'s hobby is ${this.hobby}`
    }
}

b = {}
b.__proto__ = a

console.log(b.getSummary())

function Man(name, age, hobby) {
    this.name = name
    this.age = age
    this.hobby = hobby
}

Man.prototype = {
    getSummary() {
        return `${this.name}'s hobby is ${this.hobby}`
    }
}

function ChenFeng() {
    Man.apply(this, Array.prototype.slice.call(arguments))
}

ChenFeng.prototype = Man.prototype

var chenf = new ChenFeng('chenf', 20, 'woman')
console.log(chenf.getSummary())
console.log(chenf.getSummary())

// event loop
// async function test() {
//     // promise 会产生微任务 setTimeout 会产生宏任务
//     console.log(1)
//     new Promise((res, rej) => {
//         setTimeout(() => {
//             console.log(3)
//             res()
//         }, 3000)
//     }).then(() => {
//         console.log(2)
//         return 6
//     })

//     setTimeout(() => {
//         console.log(4)
//     }, 1000)

//     console.log(5)
// }

// test()

new Promise((res, rej) => {
    rej('promise1 error')
}).then(() => {}, e => {
    console.log(e)
    return 'promise2 error'
}).then(data => {
    console.log(data)
},  e => {
    console.log(e)
})

var arr1 = [1, 2, 3, 4, undefined, function() {},  Symbol(333)]
console.log(JSON.stringify(arr1))
console.log(JSON.stringify(function() {}))
console.log(JSON.stringify(Symbol(3333)))
console.log(JSON.stringify([]) === "[]")


setTimeout(name => console.log(name), 1000, 'chenf')
