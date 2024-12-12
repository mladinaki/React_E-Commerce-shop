const mongoose = require("mongoose");

const productShema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    sizes: { type: Array, required: true },
    date: { type: Date, default: Date.now },
    avilable: { type: Boolean, default: true }
})

const ShoopModel = mongoose.models.product || mongoose.model("product", productShema);

module.exports = ShoopModel