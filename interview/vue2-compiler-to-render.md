parse

optiomize

generate

增加事件时通过包装一次回调函数来达到动态修改回调函数实际执行逻辑而不需要动态removeEventlistener和addEvnetlistener
```javascript
    const callback = () => {
        console.log('fff')
    }
    const wrapper = function() {
        const fnc = wrapper.fnc
        fnc.apply(null, arguments)
    }

    wrapper.fnc = callback

    const div = document.createElement('div')
    div.append('点击触发')
    div.addEventListener('click', wrapper, false)
    document.body.appendChild(div)
```

为什么会原生dom事件和自定义事件的区分。 因为在patch TO dom 的时候会将`data.on`复制给`listeners`同时将`data.nativeOn`复制给`data.on`。因此在原生dom上面是不能使用.native来修饰事件

自定义事件是在组件实例初始化的initEvents过程中进行注册。


initGoblaApi - platform directives

指令实现：
    1. 对指令进行解析，生成对应的指令对象。
    2. 在patch VNode的过程中会创建element，同时会执行hook中的inserted、uodated等钩子函数

普通input元素`v-model`的directives是在data中生成一个数组：会执行model指令的inserted、componentUpdated等
component组件的`v-model`是data中生成了model属性：不需要在运行时多余代码


 directive module的create hook会把vnode中自定义的directives的inserted加入到的data.hooks中

witchMarcoTask