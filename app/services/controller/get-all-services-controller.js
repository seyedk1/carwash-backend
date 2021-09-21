//model
const Service = require("../model/service-model");

exports.getAllServices = async (req, res, next) => {

    let query
    ({ page, size, ...query } = req.query)
    const constQuery = { is_active: true, is_deleted: false }

    try {
        const numberOfServices = await Service.find(constQuery).countDocuments()

        const services = await Service
            .find({ ...query, ...constQuery })
            .select('name image price description')
            .skip(((Number(page) || 1) - 1) * (Number(size) || 10))
            .limit(Number(size) || 10)

        res.status(200).json({
            items: services,
            pageCount: Math.ceil(numberOfServices / (Number(size) || 10))
        })


    } catch (err) {
        next(err)
    }
}