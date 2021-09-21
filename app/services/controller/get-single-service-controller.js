//model
const Service = require("../model/service-model");

exports.getSingleService = async (req, res, next) => {

    try {
        const service = await Service.findOne({ _id: req.params.id, is_active: true, is_deleted: false })
            .select('name image price description')

        if (!service) {
            const error = new Error("service not found")
            error.statusCode = 422
            throw error
        }

        res.status(200).json({
            service
        })

    } catch (err) {
        next(err)
    }
}