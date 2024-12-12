const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../src/constant/constant');
const UserModel = require('../src/models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();

router.post('/singup', async (req, res) => {
    const { email } = req.body;
    try {
        const users = await UserModel.findOne({ email })
        if (users) {
            return res.status(400).json({ success: false, message: 'existing user is already' })
        }

        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        await user.save();
        const payload = {
            _id: user._id,
            email: user.email,
        }
        const token = await jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "3d" })
        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.json({ success: false, message: 'Invalid email or password' })
        }

        const payload = {
            _id: user._id,
            email: user.email
        }

        const token = await jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "3d" })
        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error while getting token from server' });
    }
})



module.exports = router