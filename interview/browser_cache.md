
### 浏览器缓存处理

1. 缓存方式

    1. 强缓存 - 200
        memory cache / Disk cache
        expires - 文件过期时间（格林尼治时间）与本地时间进行比对(本地时间可以修改)
        cache-control: public（客户端和中转服务器都可以缓存）｜private（客户端可以缓存）｜no-cache（通过协商缓存来缓存数据）｜no-store（不允许缓存）｜max-age（缓存多久） 
        优先级：cache-control > expires
    2. 协商缓存 - 304
        服务器响应请求头: last-modified - 文件被修改的时间 <<===>> 请求响应头: last-modified-since - 上次文件被修改的日期
        服务器响应请求头: etag - 根据生成算法得到的文件摘要数据 <<===>> 请求响应哦图: if-none-match - 后台返回的etag
    > 协商缓存是在强缓存失效之后，携带缓存标识前往服务器进行识别，最终结果由服务器决定是否使用浏览器/中转服务器的缓存内容。

2. 缓存位置
    1. Service worker
    2. Memory cache
    3. Disk cache
    4. prefetch cache

3. 缓存方案
    HTML： 协商缓存
    css、js、img： 强缓存，在文件路径上带上hash值
    
4. 浏览器的刷新操作
    ctrl+f5: 跳过浏览器的强缓存和协商缓存
    f5: 跳过强缓存，协商缓存会进行识别。
