const orderModel = require('../src/models/orderModel');
const UserModel = require('../src/models/userModel');

const router = require('express').Router();

router.post('/list', async (req, res) => {
    try {
        const { id, items, amount, address } = req.body;

        const orderData = {
            id,
            items,
            amount,
            address,
            paynamentMethod: 'cod',
            paynament: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await UserModel.findByIdAndUpdate(id, { cartData: {} });

        res.json({ success: true, message: "Order saved successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Order Error" });
    }
})

module.exports = router