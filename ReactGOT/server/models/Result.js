const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true,},
    score: {type: Number, required: true,}
})

module.exports = model('Result', schema)