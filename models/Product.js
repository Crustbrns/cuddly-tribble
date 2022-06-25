const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true, unique: true},
    price: {type: Number, required: true, unique: false},
    discount: {type: Number, required: true, unique: false},
    imageUrl: {type: String, required: false, unique: false},
    description: {type: String, required: false, unique: false},
    Type: {type: String, required: true, unique: false},
    Genetics: {type: String, required: true, unique: false},
    IsHit: {type: Boolean, required: false, unique: false},
    IsInStock: {type: Boolean, required: true, unique: false}
})

module.exports = model('Product', schema)