//model
const Lookup = require("../model/lookup-model");

exports.getAllLookups = async (req, res, next) => {

    let query
    ({ page, size, ...query } = req.query)

    const condition = { is_active: true, is_deleted: false }

    try {
        const numberOfLookups = await Lookup.find(condition).countDocuments()

        const lookups = await Lookup.find({ ...query, ...condition })
            .skip(((Number(page) || 1) - 1) * (Number(size) || 10))
            .limit(Number(size) || 10)

        res.status(200).json({
            items: lookups,
            pageCount: Math.ceil(numberOfLookups / (Number(size) || 10))
        })

    } catch (err) {
        next(err)
    }
}