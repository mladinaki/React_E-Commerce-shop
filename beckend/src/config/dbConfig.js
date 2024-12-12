const mongoose = require('mongoose');
const { DB_URL } = require('../constant/constant');

async function dbConnect() {
    await mongoose.connect(DB_URL)
}

module.exports = dbConnect




