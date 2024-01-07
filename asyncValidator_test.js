const asyncValidator = require('async-validator')

const model = {
    name: 'hellp'
}

const descriptor = {
    name: [{ required: true, validator: (rule, value, cb) => {
        return cb('hahahha')
    }, trigger: 'change' }]
}

const validator = new asyncValidator(descriptor)

validator.validate(model, {}, e => {
    console.log(e)
})