//model
const User = require("../model/user-model");

exports.editUser = async (req, res, next) => {

    const { first_name, last_name } = req.body

    const condition = { _id: req.params.id, is_active: true, is_deleted: false }

    try {
        await User.editUserValidation({
            first_name, last_name
        });

        const user = await User.findOneAndUpdate(condition, { first_name, last_name });

        if (!user) {
            res.status(404).json({ message: "user not found" })
        }

        res.status(200).json({ message: 'user is updated successfully' })

    } catch (err) {
        console.log(err);
        next(err)
    }
};