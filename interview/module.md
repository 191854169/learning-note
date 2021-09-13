### require查找文件的顺序

1. 查找node内置模块
2. 查找缓存中是否有该模块数据
3. 查找路径对应的文件（如果未添加后缀，则添加js，json等后缀进行尝试）
4. 查找对应路径作为文件夹加载
5. 最后会查找项目下的node_modules内的模块

### 当路径作为文件夹查找顺序

1. 会优先查找项目下的package.json中的main字段
2. 找不到会找根目录下的以index命名的，后缀为js、json、html等文件

### require主要支持三种文件

1. .js文件 - 通过拼接文件内容生成匿名函数，匿名函数会传入this、this.exports、this.filename、this.dirname
2. .json文件
3. .node文件 `C++`编译后的二进制文件

### Module require 流程
```javascript
const path = require('path');
const fs = require('fs');

class MyModule {
    _cache: {}
    _extensions: {
        '.js': function(context, filename) {
            const code = fs.readFileSync(filename)
            context.compile(code, filename)
        },
        '.json': function(context, filename) {}
    }
    _wrappers: ['(function(exports, require, module, filename, dirname){', '})']

    constructor(id) {
        this.id = id
        this.path = path.dirname(id)
        this.exports = {}
        this.filename = null
        this.loaded = false
    }

    static _load(path) {
        const filename = MyModule._resolveFileName(path)
        
        if (MyModule._cache[filename]) {
            return MyModule._cache[filename]
        }

        // 不存在就创建一个module实例，并通过实例方法load模块
        const module = new MyModule(filename)

        // 在加载之前提前给缓存中增加模块，防止循环引用导致死循环
        MyModule._cache[filename] = module
        // 加载
        module.load(filename)
        // 对外是到处exports
        return module.exports
    }
    // 解析并判断路径是否存在 - 对应上方文件的查找顺序
    static _resolveFileName() {
        // do something
    }

    static wrap(content) {
        return MyModule._wrappers.splice(1, 0, content).join(')
    }

    // 对外的require
    require(path) {
        return MyModule._load(path)
    }
    // 用于实例加载
    load(filename) {
        // 
        const ext = path.extname(filename)

        const exec = MyModule._extensions[ext](this, filename)
        
        this.load = true
    }

    compile(code, filename) {
        const wrapper = MyModule.wrap(code)

        const compilerWrapper = vm.runInThisContext(wrapper, {
            filename,
            lineoffset: 0,
            displayErrors: true
        } = optionis)
        // 封装的函数会传入module.exports,require,module,filename,dirname参数
        const _exports = this.exports
        const _require = this.require
        const _module = this
        compilerWrapper.call(_exports, _exports, _require, _module, filename, dirname)
    }
}
```

### 讲解文章
[文章1](https://juejin.cn/post/6866973719634542606#heading-2)