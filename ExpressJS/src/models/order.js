const mongoose= require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true, min: 1 },
        isCommented: { type: Boolean, default: false } // Đánh dấu đã đánh giá hay chưa
    }],
    totalAmount: { type: Number, required: true },
    statusPayment: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    statusOrder: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
