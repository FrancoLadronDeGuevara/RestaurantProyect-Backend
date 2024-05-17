const User = require("../models/user.model");

const createUserService = async (user) => {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
}

const getByEmailService = async (email) => {
    return User.findOne({ email });
};

const getUserService = async(id) => {
    return User.findById(id);
}

module.exports = { createUserService, getUserService, getByEmailService }