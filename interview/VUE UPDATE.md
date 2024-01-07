watcher update -> queueWatcher -> nextTick(flushSchedulerQueue)

数据更改 -> 观察者（watcher）更新 (1、计算属性watcher -> 触发渲染watcher的更新 2、观察watcher -> 对于数据更新之后做的操作，可能会导致更多更新 3、渲染watcher - 会重新生成virtual dom，并应用到Dom树上)

异步更新数据 - 在微任务里面进行数据的更新+dom内容的更新