//model
const Lookup = require("../model/lookup-model");

exports.deleteLookup = async (req, res, next) => {

    const condition = { _id: req.params.id, is_active: true, is_deleted: false }
    try {

        const lookup = await Lookup.findOneAndUpdate(condition, { is_deleted: true })

        if (!lookup) {
            res.status(404).json({ message: "There is no exist item with these information in lookup" })
        }

        res.status(200).json({ message: 'item in lookup is removed successfully' })

    } catch (err) {
        console.log(err);
        next(err)
    }
};