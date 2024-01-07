const micromatch = require('micromatch')
// --allow-empty：https://stackoverflow.com/questions/71420124/how-do-i-solve-this-empty-git-commit-warning
module.exports = {
    '**.js': files => {
        files = micromatch.not(files, './src/vendor')
        // 1、先eslint校验 2、prettier format 3、ignore files will extend eslint or prettier
        return [`eslint ${files.join(' ')}`, `npx prettier --write ${files.join(' ')}`]
    },
}
