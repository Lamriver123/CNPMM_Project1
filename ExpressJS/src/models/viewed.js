const mongoose= require('mongoose');

const viewedSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const Viewed = mongoose.model('viewed', viewedSchema);

module.exports = Viewed;