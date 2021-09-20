//model
const Lookup = require("../model/lookup-model");

exports.getSingleLookup = async (req, res, next) => {

    try {
        const lookup = await Lookup.findOne({ _id: req.params.id, is_active: true, is_deleted: false })

        if (!lookup) {
            const error = new Error("This item is not exist in lookup")
            error.statusCode = 422
            throw error
        }

        res.status(200).json({
            lookup
        })

    } catch (err) {
        next(err)
    }
}