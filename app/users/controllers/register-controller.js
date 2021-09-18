const bcrypt = require("bcryptjs");

const User = require("../models/user");


exports.register = async (req, res, next) => {
    try {
        await User.createUserValidation(req.body);
        const { username, password, isAdmin } = req.body;

        const user = await User.findOne({ username, isActive: true, isDeleted: false });
        if (user) {
            const error = new Error("The user is already exist in database")
            error.statusCode = 422
            throw error
        }
        else {
            const hash = await bcrypt.hash(password, 10);
            await User.create({ username, password: hash, role: isAdmin ? 'admin' : 'customer', isAdmin });

            res.status(201).json({ message: "user created successfully" })
        }
    } catch (err) {
        console.log(err);
        next(err)
    }
};
