const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    itemName: {
        type: String
    }
});

module.exports = mongoose.model('Cart', cartSchema);