const {Schema, model} = require('mongoose')

const Token = new Schema({
    accessToken: {type: String, unique: false },
    refreshToken: {type: String, unique: false, }
})

module.exports = model('Role', Role)