const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true,},
    description: {type: String, required: true,},
    price: {type: Number, required: true},
    url: {type: String, required: true}
})

module.exports = model('Goods', schema)