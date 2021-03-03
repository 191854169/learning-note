// function foo() {
//     console.log('hello Boy!');
    
// }


// function doo() {
//     console.log('fuck you!')
// }
// console.log('foo()')
// console.log('嘻嘻嘻')
// // function foo() {
// //     console.log('hello Boy!');
    
// // }


// // function doo() {
// //     console.log('fuck you!')
// // }
// // console.log('foo()')
// // console.log('嘻嘻嘻')

// 'use strict'
// console.log(this)
// function doo() {
//     const test = () => {
//         console.log(this)
//     }
//     test()
// }

// function foo() {
//     const test = () => {
//         console.log(this === global)
//     }
//     test()
// }
// doo()
// foo()


class Animal {
    constructor(){
        this.printName = this.printName.bind(this)
    }
    printName () {
      this.print('Hello animal');
    }
    print(name) {
      console.log(name);
    }
}
var animal = new Animal()
animal.printName()