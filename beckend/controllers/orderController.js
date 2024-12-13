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
            paynamentMethod: 'COD',
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

router.post('/order', async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'error' })
    }
})

router.post('/all-order', async (req, res) => {

    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders });

    } catch (error) {
        log.error(error);
        res.json({ success: false, message: error.message })
    }
})

router.post('/status', async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, status });

    } catch (error) {
        log.error(error);
        res.json({ success: false, message: error.message })
    }
})

module.exports = router