const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// model
const User = require("../model/user-model");


exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (isEqual) {
            const token = jwt.sign(
                {
                    user: {
                        user_id: user._id.toString(),
                        username: user.username,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        is_admin: user.is_admin
                    },
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: 24 * 60 * 60 * 1000 // 24 hours or 1 day
                }
            );
            res.status(200).json({
                token,
                user_id: user._id.toString(),
                first_name: user.first_name,
                last_name: user.last_name,
                is_admin: user.is_admin,
                message: `${user.first_name + ' ' + user.last_name} خوش آمدید!`
            });
        } else {
            const error = new Error("username or password is wrong");
            error.statusCode = 422;
            throw error;
        }
    } catch (err) {
        next(err);
    }
};
