const {Schema, model} = require('mongoose')

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    adminroot: {type: Boolean, required: true, unique: false}
})

module.exports = model('User', schema)