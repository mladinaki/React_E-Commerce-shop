const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../src/constant/constant');

exports.authMiddleware = async (req, res, next) => {
    const { token } = req.headers

    if (!token) {
        return res.json({ success: false, message: 'Not authorized Login' })
    }
    try {
        const token_decode =  jwt.verify(token, JWT_SECRET_KEY)
        req.user = token_decode
        req.body.id = token_decode._id;
        next();

    } catch (error) {
        console.log(error);
        res.json({ error: error.message })
    }
}