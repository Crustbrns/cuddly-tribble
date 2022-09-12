const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true,},
    surname: {type: String, required: true,},
    family: {type: String, required: true}
})

module.exports = model('Person', schema)