const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const { JWT_SECRET_KEY, ADMIN_PASSWORD, ADMIN_EMAIL } = require('../src/constant/constant');
dotenv.config({ path: `${__dirname}/config.env` });

exports.adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers

        if (!token) {
            return res.json({ success: false, message: 'Not authenticated Login' })
        }
        const token_decode =  jwt.verify(token, JWT_SECRET_KEY);

        if (token_decode !== ADMIN_EMAIL + ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not authenticated Login Failed' })
        }

        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}