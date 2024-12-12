
const mongoose = require('mongoose');

const orderShema = new mongoose.Schema({
    id: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'Order Place' },
    paynamentMethod: { type: String, required: true },
    paynament: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true }
})

const orderModel = mongoose.models.order || mongoose.model('order', orderShema);


module.exports = orderModel;