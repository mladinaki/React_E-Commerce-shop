const UserModel = require('../src/models/userModel');
const router = require('express').Router();
const shoopService = require('../shoopServices/shoopServices');

router.post("/cart", async (req, res) => {
    try {
        const { id, itemId, size } = req.body
        const userData = await UserModel.findById(id);
        let cartData = await userData.cartData;
        console.log(cartData);

        if (cartData[itemId]) {

            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;

            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await UserModel.findByIdAndUpdate(id, { cartData });
        res.json({ succsess: true, message: 'Add cart' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
})

router.post('/get', async (req, res) => {
    try {
        const { id } = req.body
        let userData = await UserModel.findById(id)
        let cartData = await userData.cartData;

        res.json({ succsess: true, cartData })

    } catch (error) {
        console.log(error);
        res.json({ succsess: false, message: "Error fetch user cart" });
    }
})

router.post('/update', async (req, res) => {

    try {
        const { id, itemId, size, quantity } = req.body;
        const userData = await UserModel.findById(id);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await UserModel.findByIdAndUpdate(id, { cartData });
        res.json({ succsess: true, message: 'Cart update' });

    } catch (error) {
        console.log(error);
        res.json({ succsess: false, message: "Error Carat Update" });
    }
})

router.post('/remove-cart', async (req, res) => {
    try {
        const { id, itemId, size, quantity } = req.body;

        const userData = await UserModel.findById(id);
        const cartData = await userData.cartData;

        if (cartData[itemId][size] > 0) {
            cartData[itemId][size] -= 1
        }

        await UserModel.findByIdAndUpdate(id, { cartData });
        res.json({ succsess: true, message: 'Cart removed!' });
        console.log(cartData[itemId][quantity]);

    } catch (error) {
        console.log(error);
        res.json({ succsess: false, message: "Error cart removed!" });
    }
})

module.exports = router