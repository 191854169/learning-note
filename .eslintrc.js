module.exports = {
    root: true,
    env: {
        node: true
    },
    rules: {
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-vars': 'off',
        'prettier/prettier': [
            'error',
            {
                printWidth: 120,
                singleQuote: true,
                tabWidth: 4,
                semi: false
            }
        ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}