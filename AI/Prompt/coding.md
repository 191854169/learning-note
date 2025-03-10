## 通过什么方式可以让大模型生成的代码更完整，保证代码的可执行性？
- 角色设定
- 需求步骤拆分
    - 尝试通过给出一个例子，来让大模型来对需求进行整理描述。
- 内置提问（对可能出现的问题采用`提问->答案`），来完善预期代码
- 如何能验证代码的可执行性？
    - 跑一次可以验证？
    - 是否能通过相关语言的校验器？
    ```mermaid
    flowchart LR
        A[生成代码] --> B[拆解代码到对应文件]
        B --> C[vue文件]
        B --> D[JavaScript文件]
        C --> G[是否存在vue文件校验工具？还是通过vue-complier]
        D --> E[filter、list、common文件]
        E --> F[eslint、tslint校验]

    ```
- 指定代码风格、命名约定、性能要求等
- 对大模型的结果做一个提问反馈，来优化其内部的结果
- 是否简洁的问题可以更快的得到大模型的结果呢？


### 测试案例
- 角色设定
- 第一步：我想通过vue+vite+typescript+antd-design-vue来写一个管理中台的详情页
- 第二步：我想增加一个表单模块，表单模块采用flex布局，左右布局。
- 我想在详情页底部增加一个固定布局的`保存`、`取消`按钮
- 返回完整的代码，并告诉我怎么样才能运行代码