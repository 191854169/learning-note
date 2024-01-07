const fs = require('fs')

const checkCommitMsg = () => {
    const filePath = process.argv[2]
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' })
    /**
     * feat: 增加新功能
     * fix: 修复bug
     * docs: 只改动了文档相关的内容
     * style: 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
     * build: 构造工具的或者外部依赖的改动，例如webpack，npm
     * refactor: 代码重构时使用
     * revert: 执行git revert打印的message
     */
    const regexp = /^(feat|fix|opt|doc|style|build|refactor|revert):/
    if (!regexp.test(data)) {
        console.error('commit msg is not specifty')
        process.exit(18)
    }
}

checkCommitMsg()
