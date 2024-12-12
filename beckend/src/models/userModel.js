const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now }
}, { minimize: false })

UserSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
})

const UserModel = mongoose.models.user || mongoose.model('user', UserSchema)

module.exports = UserModel