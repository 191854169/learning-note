### javascript的基本类型
    七种基本类型：
    1. Number
    2. String
    3. Boolean
    4. null
    5. undefined
    6. Object
    7. Symbol
    8. BigInt

### 校验javascript类型的方法

1. typeof 可以校验除`null`外的基本类型，无法校验除`Function`外的具体引用类型
![test!](https://raw.githubusercontent.com/191854169/learning-note/master/typeof.png)
2. instanceof 可以校验具体是哪一种引用类型 - 原理是通过检测**变量**的`__proto__`是否包含**引用类型**的`__proto`来决定结果
3. Object.prototype.toString 可以用来识别基本类型+引用类型


### Javascript Execution Context

是代码执行时所在的一个上下文，上下文包含`变量对象`、`作用域链`、`this`。
1. 全局上下文 - 一直存在
2. 函数上下文 - 在函数执行的时候被创建，同时压入上下文栈

### Javascript Scope

作用域是代码执行时所在的一个环境，它定义了变量所在的区域及查找时的顺序和位置。
js是词法解析，因此是静态作用域，在代码编译的时候就决定了其作用域。

1. 全局作用域
2. 函数作用域
3. 块级作用域 （let、const）

### 闭包

闭包是指一个函数对另一个函数作用域的变量存在引用关系时产生的一个语法现象。
通常的使用场景是用来作为内部变量来存储/统计数据，并且外部无法直接干预该内部变量。

### This

this是执行上下文中的一个变量，他是以函数的调用者来定义的。

    1. this指向
    2. 改变this指向的方法
    3. call和apply
    4. 手动实现call和apply
    5. bind =》 柯里化

### Javascript Prototype

`__proto__`是js特有的一种继承机制，通过指定`对象`|`函数`的`__proto__`可以在对象查找属性的时候逐级查找`__proto__`,一直到`__proto__`为`null`.

### Javascript 继承

```javascript
    // common object extend
    a = {
        name: 'chenf',
        age: 20,
        hobby: 'woman',
        getSummary() {
            return `${this.name}'s hobby is ${this.hobby}`
        }
    }
    // method 1
    b = {}
    b.__proto__ = a
    // method
    b = Object.create(a)

    console.log(b.getSummary())

    // Function extend
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
```

### Promise+

promise+是一个协议，是解决嵌套式回调的一种方案

### 如何实现一个Promise+

[Promise A+](https://promisesaplus.com/): 基本规范地址
[promise+手写实现](https://mp.weixin.qq.com/s/qdJ0Xd8zTgtetFdlJL3P1g)

    pormise 包含三种状态
### async await

- 语法糖 通过将await后面的代码放到then函数里面

### 深浅拷贝（针对引用对象而言）

- 浅拷贝：只复制对象引用地址，当原对象属性值改变时，新对象也会改变
- 深拷贝：递归进行对象属性的拷贝，包含原始值和引用对象值。
    - JSON.Stringify - JSON.parse
        - JSON.Stringify注意事项

        > If undefined, a function, or a symbol is encountered during conversion it is either omitted（忽略、省略了的） (when it is found in an object) or censored（审查、检查、删改） to null (when it is found in an array). JSON.stringify can also just return undefined when passing in "pure" values like JSON.stringify(function(){}) or JSON.stringify(undefined).
        
        ```javascript
            // undefined|Function|Symbol will be ignore in JSON.Stringify
            // stringify 存在循环引用的对此昂会报错

            var foo = {}
            foo.b = foo
            JSON.stringify(foo)
            /**
                    Uncaught TypeError: Converting circular structure to JSON
                        --> starting at object with constructor 'Object'
                        --- property 'b' closes the circle
                        at JSON.stringify (<anonymous>)
                        at <anonymous>:1:6*/
        ```
    - 

     ### 相关文章
    [基础文章](https://github.com/axuebin/articles/issues/20)


### 事件循环

1. 什么是事件循环？
    浏览器事件循环
    node事件循环

    是一种针对javascript这种单线程语言的异步处理机制。
    防止js的执行时间过长，造成页面的卡顿和交互异常。
    是依赖于宿主环境实现的循环弹出*任务 - Function*给js engine执行的机制。


### CSS 回流和重绘
1. 回流（reflow）
    当元素的位置、大小、现实与否发生改变时，会引起自己、周围、父级元素的回流
    操作：
    - 页面首次渲染
    - 浏览器窗口大小改变
    - 元素尺寸｜位置发生改变
    - 元素内容发生改变（内容变多、图片增加等）
    - 元素字体大小发生改变（行高固定，改变字体大小会不触发回流么？）
    - 添加｜删除**可见**的DOM
    - 激活css伪类（hover等）
    - 激活某个元素的伪元素
    - 查询某些属性｜方法
        - clientWidth、clientHeight、clientTop、clientLeft
        - offsetWidth、offsetHeight、offsetTop、offsetLeft
        - scrollWidth、scrollHeight、scrollTop、scrollLeft
        - scrollInToView()、scrollIntoViewIfNeed()
        - getComputedStyle()
        - getBoundingClientRect()
        - scrollTo
2. 重绘
    当某个元素的表现属性发生改变时会引起该元素的重绘。

3. 如何避免/减少重绘｜回流的发生
    - 尽可能精确的在dom上进行修改
    - 将修改的属性通过一次性修改style｜增/删class的方式
    - 脱离文档流进行一系列操作：将一些会引起大量重绘｜回流的操作放在absolute｜fixed元素上
    - 避免使用css表达式（例如：<span style="color: orange;">calc()</span>)
    - 通过Document Fragment来操作dom，最后插入dom
    - 缓存通过js方法获取的css属性

GOOD ARTICLE LINKS:
    [reflow && repaint](https://juejin.cn/post/6844903569087266823)
    [css refluence javascript](https://www.zhangxinxu.com/wordpress/2010/01/%E5%9B%9E%E6%B5%81%E4%B8%8E%E9%87%8D%E7%BB%98%EF%BC%9Acss%E6%80%A7%E8%83%BD%E8%AE%A9javascript%E5%8F%98%E6%85%A2%EF%BC%9F/)

### css层叠上下文

[张鑫旭层叠上下文](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)

### MVVM

M - Model - logic code
V - view - UI
VM - Control - when logic code changed Control will automatically change view. As will, when user input val through input, Control will change logic code.

GOOD ARTICLE LINK LIST: 

- [手写Vue的数据双向绑定](https://juejin.cn/post/6844903586103558158)
- [Vue MVVM实现](https://github.com/DMQ/mvvm)


### 数据劫持实现方法的优缺点

- Object.defineProperty 需要遍历每个对象的每个属性，有一定的性能损耗。不支持数组的原生方法触发劫持setter，需要采用hack方式

- Proxy 原生方法 + 劫持整个对象，减少性能损耗 + 支持劫持数组方法变化


### 状态管理 Flux Redux Vuex React-redux

抽离出共享的状态，按照约定的规则，统一管理数据，让数据的变化可预测。
[多个状态管理工具对比](https://zhuanlan.zhihu.com/p/53599723)

### Node express

轻便、简单、易扩展的web服务器

```javascript
    const express = require('express')
    const ejs = require('ejs') // 模版引擎
    const app = express()

    // 通过use可以使用插件
    app.use('view engine', ejs)
    app.use(express.json()) // 处理请求中的json
    // 返回静态文件
    const commonmiddleware = (request, response, next) => {}
    // common middleware - 通过中间件处理公共逻辑
    app.use(commonMiddleware)

    const indivalMiddleware = (request, response, next) => {}
    // routes
    app.get('/', invivalMiddleware, (request, response, next) => {})

    app.listen('8080')
```
### 跨域请求（预检请求OPTIONS）
浏览器的安全策略，用于保护网站的后台资源安全。会在OPTIONS请求的请求头中带有后续请求会带有请求头字段+请求方法
- requestHeaders:
    - access-control-request-headers: xxx,yyy
    - access-control-request-methods: GET,POST,DELETE,PUT,OPTIONS
- responseHeaders:
    - access-control-allow-headers: xxx,yyy (后台设置的请求头)
    - access-control-allow-methods: GET,POST,DELETE,PUT,OPTIONS
    - access-control-allow-origin: https://xxx.com

![跨域请求头图片展示!](https://raw.githubusercontent.com/191854169/learning-note/master/cors.png)
### 工作里遇到的最困难的事情


### electron是个什么东西？

### 为什么要选择electron

1. 跨平台

### vue-template-compiler

### 自我介绍
1. 我是谁
2. 来自哪
3. 毕业院校
4. 工作经历（经历的公司）
5. 在公司的主要职责（PC - 中后台管理系统、移动端 - 内嵌APP的H5页面开发）

### 主要的职业规划


### html、js、css文件加载的关系

html与css会并行解析，分别生成DOM与CSSOM，然后合并成Render Tree，进入Rendering Pipeline；但如果有js，css加载会阻塞后面js语句的执行，而（同步）js脚本执行会阻塞其后的DOM解析（所以通常会把css放在头部，js放在body尾）


### script标签与HTML页面解析之间的关系
![script的异步加载](https://raw.githubusercontent.com/191854169/learning-note/master/script-load-rule.png)
1. defer 加载｜未加载完 都会等待页面的解析之后按顺序执行，会在DOMContentLoaded之前执行

2. async 加载完之后就会执行代码，会阻塞页面的解析。执行顺序看加载进度的先后。 DOMContentLoad事件可能会在前或后执行，load一定会其之前执行

### VUE响应式处理

1. 对象会遍历其属性，通过defineProperty设置set和get同时Dep对象来收集使用依赖，在属性更新的时候同时Dep内的依赖者更新。
2. 数组会重写可以修改数组元素内容和顺序的方法，在调用的时候通过数组的__ob__内部的Dep来通知依赖者更新。


### 精度丢失问题
[文章解释](https://github.com/camsong/blog/issues/9)

小数保存的方式是通过科学技术法+
因为以64位二进制长度来保存数字。这里有符号位1，exponent指数位11，尾数52。当小数转化为二进制的时候就会出现尾数不足的时候，此时会通过进1舍0的方式来保存数据，此时就会出现精度丢失问题。

### 面经
[死磕 36 个 JS 手写题（搞懂后，提升真的大）](https://juejin.cn/post/6946022649768181774 )
[从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)
[前端面经 - 看这篇就够了（帮你拿到大厂offer）](https://juejin.cn/post/6948227795059212318)
[当面试官问Webpack的时候他想知道什么](https://juejin.cn/post/6943468761575849992)
[探索 Snabbdom 模块系统原理（vue vnode-diff算法思想研究）](https://juejin.cn/post/6941009454376681479)
[17K star 仓库，解决 90% 的大厂基础面试题](https://juejin.cn/post/6947860760840110088)

