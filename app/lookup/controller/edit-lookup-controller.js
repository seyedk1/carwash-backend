//model
const Lookup = require("../model/lookup-model");

exports.editLookup = async (req, res, next) => {

    const { parent_id, title } = req.body

    const condition = { _id: req.params.id, is_active: true, is_deleted: false }
    try {

        await Lookup.editLookupValidation({
            parent_id, title
        });

        const lookup = await Lookup.findOneAndUpdate(condition, { parent_id, title });

        if (!lookup) {
            res.status(404).json({ message: "There is no exist item with these information in lookup" })
        }
        
        res.status(200).json({ message: 'item in lookup is updated successfully' })

    } catch (err) {
        console.log(err);
        next(err)
    }
};