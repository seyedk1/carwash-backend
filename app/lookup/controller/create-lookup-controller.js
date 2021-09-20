const Lookup = require("../model/lookup-model");


exports.createLookup = async (req, res, next) => {
    try {
        await Lookup.createLookupValidation(req.body);
        const { parent_id, title } = req.body;

        const lookup = await Lookup.findOne({ parent_id, title, is_active: true, is_deleted: false });
        if (lookup) {
            const error = new Error("The user is already exist in database")
            error.statusCode = 422
            throw error
        }
        else {
            await Lookup.create({ parent_id, title });

            res.status(201).json({ message: "something added to lookup successfully" })
        }
    } catch (err) {
        console.log(err);
        next(err)
    }
};
