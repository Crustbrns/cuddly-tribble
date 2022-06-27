const { Schema, model } = require('mongoose')

const schema = new Schema({
    Title: { type: String, required: true, unique: false, index: true, sparse: true },
    Price: { type: Number, required: true, unique: false },
    Discount: { type: Number, required: true, unique: false },
    ImageUrl: { type: String, required: true, unique: false },
    Description: { type: String, required: true, unique: false },
    Type: { type: String, required: true, unique: false },
    Genetics: { type: String, required: true, unique: false },
    IsHit: { type: Boolean, required: false, unique: false },
    IsInStock: { type: Boolean, required: false, unique: false }
})

module.exports = model('Product', schema)