const {Schema, model} = require('mongoose')

const User = new Schema({
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    role: [{type: String, ref: 'Role'}]
})

module.exports = model('User', User)