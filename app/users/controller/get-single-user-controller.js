//model
const User = require("../model/user-model");

exports.getSingleUser = async (req, res, next) => {

    try {
        const user = await User.findOne({ _id: req.params.id, is_active: true, is_deleted: false })
        .select('username first_name last_name is_admin')

        if (!user) {
            const error = new Error("user not found")
            error.statusCode = 422
            throw error
        }

        res.status(200).json({
            user
        })

    } catch (err) {
        next(err)
    }
}