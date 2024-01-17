const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

}, {
    timestamps: true
});

var Nations = mongoose.model('nations', nationSchema);

module.exports = Nations;
