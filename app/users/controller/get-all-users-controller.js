//model
const User = require("../model/user-model");

exports.getAllUsers = async (req, res, next) => {

    let query
    ({ page, size, ...query } = req.query)
    const constQuery = { is_active: true, is_deleted: false }

    try {
        const numberOfUsers = await User.find(constQuery).countDocuments()

        const users = await User
            .find({ ...query, ...constQuery })
            .select('username first_name last_name is_admin')
            .skip(((Number(page) || 1) - 1) * (Number(size) || 10))
            .limit(Number(size) || 10)

        res.status(200).json({
            items: users,
            pageCount: Math.ceil(numberOfUsers / (Number(size) || 10))
        })


    } catch (err) {
        next(err)
    }
}