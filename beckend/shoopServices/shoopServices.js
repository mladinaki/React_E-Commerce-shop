const UserModel = require("../src/models/userModel");


exports.singleShoop = async (shoopId) => {
    const user = await UserModel.findOne({ shoopId })
    return user
};
exports.update = async (shoopId) => await UserModel.findOneAndUpdate(shoopId);