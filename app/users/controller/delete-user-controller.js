//model
const User = require("../model/user-model");

exports.deleteUser = async (req, res, next) => {

    const condition = { _id: req.params.id, is_active: true, is_deleted: false }
    
    try {
        const user = await User.findOneAndUpdate(condition, { is_deleted: true })

        if (!user) {
            res.status(404).json({ message: "user not found" })
        }

        res.status(200).json({ message: 'user is deleted successfully' })

    } catch (err) {
        console.log(err);
        next(err)
    }
};