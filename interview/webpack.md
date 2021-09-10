### webpack 官网
[官网链接]()

### webpack 基础知识

[webpack分析文章 - 1](https://juejin.cn/post/6844904094281236487#heading-4)
1.什么是loader
    `Description` 一种编译函数，通过将非js代码的内容、文件转换为js。
    `Configure` loader的配置是在module.rules中以对象的形式配置
    `常用loaders`
- 文件处理loader：file-loader（把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)）、url-loader（）、
- 框架处理loader：vue-loader
- js代码编译loader：babel-loader
- css代码编译loader：scss-loader、sass-loader、css-loader、style-loader、postcss-loader（用于编译新特性，同时支持autoprefixer补齐浏览器前缀）
检查性loader：eslint-loader（代码规范）
2.什么是plugin
    plugin就是插件，插件其实就是对webpack功能的扩展，对于webpack这种流程化的打包工具来说会在不同的节点进行事件的触发，插件就是基于这些事件去对webapck编译出来的内容做改变，随后返回结果。
    plugin是在plugins中以plugin的实例对象进行配置
    常用的plugin
        define-plugin：变量定义
        uglifyjs-webpack-plugin、webpack-uglify-parallel-plugin(多进程)：文件压缩
        ingore-plugin：忽略文件
        clean-webpack-plugin：目录清理
        mini-css-extract-plugin：抽离css代码为单独文件
        speed-measure-webpack-plugin：打包速度总览，看哪一个模块花费多少时间，方便进行打包优化
        image-webpack-loader：优化图片（压缩）
3.webpack的基本流程
    1）读取shell参数，合并参数，读取plugins，启动编译
    2）根据entry｜entries查找对应的入口文件，通过loader的配置参数test来匹配对应的loader，进行编译，同时对其依赖采用递归编译
    3）根据打包好的chunk输出到对应的文件路径
4.提高打包速度方式
    1）内容压缩 - 图片、代码（js、css）、tree-shaking
    2）多进程打包 - webpack-uglifyjs-parallel-plugin
    3）模块制定 -  include/exclude + resolve.modules(z指定第三方模块的绝对路径) + noParse（不解析，但是会打包）
    4）公共包通过cdn引入 - 加快打包速度，但是会稍微减缓页面加载速度 - 需要注意公共包的引入时机
    5）利用缓存 - babel-loader、cache-loader开启缓存