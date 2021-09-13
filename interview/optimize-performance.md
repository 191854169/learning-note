### 代码优化
    
PROBLEMS
1. 数据加载处理
    1. 页面交互卡顿
        1. dom节点过多 - 分页加载｜分片加载
        2. vue组件更新过多 - 数据依赖存在不合理，导致过分render
        3. 对事件进行防抖处理
        4. 内存释放 - 对不使用的变量进行null设定，对dom事件进行注销

2. dom样式修改合并

### 图片优化
1. 图片本身质量压缩
2. base64化
3. cdn存储

### http请求优化

1. 请求数据过于庞大，拆分接口进行数据区分。
2. 合并请求（雪碧图）


### 缓存处理

1. html、css、js、img强缓存、协商缓存减少请求时间
2. 代码内部缓存处理
3. 对于dom属性进行持久化处理，防止回流的触发

### 体验优化

1. 异步加载、按需加载数据
2. 骨架屏
3. 对于动画元素，让元素脱离文档流，减少浏览器的重绘、回流操作
    1. transform 新建渲染图层
    2. position非static
    3. display: none
    4. will-change 新建渲染图层

### 打包优化
1. 分包
2. tree shaking 通过import的语法查找未使用的变量和方法并删除掉





### 虚拟列表
    通过配置可视容器的paddingTop和paddingBottom来撑开滚动容器高度，让其可滚动。通过设置一个锚点元素来查找其上下需要渲染的元素，需要去存储已渲染和为渲染的元素。
[虚拟列表实现](https://github.com/dwqs/blog/issues/70)
[页面性能优化](https://mp.weixin.qq.com/s/A3AmmDWCimyH9E2KuHaMzw)
