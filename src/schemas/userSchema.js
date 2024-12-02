const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    userId: String,
    spugneSegate: Number,
});

module.exports = model('userSchema1', userSchema);