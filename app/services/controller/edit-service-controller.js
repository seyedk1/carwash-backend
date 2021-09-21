const fs = require('fs')

const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");

//model
const Service = require("../model/service-model");

exports.editService = async (req, res, next) => {

    const serviceImage = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${serviceImage.name}`;
    const uploadPath = `${appRoot}/public/uploads/serviceImages/${fileName}`;
    const condition = { _id: req.params.id, is_active: true, is_deleted: false }

    try {

        if (serviceImage.name)
            await Service.editServiceValidation({ ...req.body, image: serviceImage });
        else
            await Service.editServiceValidation({
                ...req.body,
                image: {
                    name: "placeholder",
                    size: 0,
                    mimetype: "image/jpeg",
                },
            });

        const service = await Service.findOne(condition)

        if (!service) {
            res.status(404).json({ message: "service not found" })
        }

        if (serviceImage.name) {
            fs.unlink(
                `${appRoot}${service.image}`,
                async (err) => {
                    if (err) console.log(err);
                    else {
                        await sharp(serviceImage.data)
                            .jpeg({ quality: 60 })
                            .toFile(uploadPath)
                            .catch((err) => console.log(err));
                    }
                }
            );
        }

        await Service.updateMany(condition, {
            ...req.body,
            image: serviceImage.name ? '/uploads/serviceImages/' + fileName : service.image
        })

        res.status(200).json({ message: 'service is updated successfully' })

    } catch (err) {
        console.log(err);

        next(err)
    }
};