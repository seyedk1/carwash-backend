//model
const Service = require("../model/service-model");

exports.deleteService = async (req, res, next) => {

    const condition = { _id: req.params.id, is_active: true, is_deleted: false }

    try {
        const service = await Service.findOneAndUpdate(condition, { is_deleted: true })

        if (!service) {
            res.status(404).json({ message: "service not found" })
        }

        res.status(200).json({ message: 'service is deleted successfully' })

    } catch (err) {
        console.log(err);
        next(err)
    }
};