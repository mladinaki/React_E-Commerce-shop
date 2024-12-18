const mongoose = require('mongoose');
const { DB_URL } = require('../constant/constant');

const dbConnect = async () => {
    await mongoose.connect(`${DB_URL}/shooper-online-shop`)
}

module.exports = dbConnect;