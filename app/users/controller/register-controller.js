const bcrypt = require("bcryptjs");

const User = require("../model/user-model");


exports.register = async (req, res, next) => {
    try {
        await User.createUserValidation(req.body);
        const { username, password, first_name, last_name, is_admin } = req.body;

        const user = await User.findOne({ username, is_active: true, is_deleted: false });
        if (user) {
            const error = new Error("The user is already exist in database")
            error.statusCode = 422
            throw error
        }
        else {
            const hash = await bcrypt.hash(password, 10);
            await User.create({ username, first_name, last_name, password: hash, is_admin });

            res.status(201).json({ message: "user created successfully" })
        }
    } catch (err) {
        console.log(err);
        next(err)
    }
};
