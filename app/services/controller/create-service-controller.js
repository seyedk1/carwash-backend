require('module-alias/register')

const multer = require("multer")
const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");

//model
const Service = require("../model/service-model");

const { fileFilter } = require("@root/core/util/multer");


exports.createService = async (req, res, next) => {

    const serviceImage = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${serviceImage.name}`;
    const uploadPath = `${appRoot}/public/uploads/serviceImages/${fileName}`;

    try {

        const info = { ...req.body, image: serviceImage };

        await Service.createServiceValidation(info);

        const { name } = info;

        const service = await Service.findOne({ name }).select('name');
        if (service) {
            const error = new Error("This service is already exist in database")
            error.statusCode = 422
            throw error
        }
        else {
            const upload = multer({
                limits: { fileSize: 4000000 },
                fileFilter: fileFilter,
            }).single("image");


            upload(req, res, async (err) => {
                try {
                    if (err) {
                        if (err.code === "LIMIT_FILE_SIZE") {
                            return response.status(422).json({
                                error: "حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد",
                            });
                        }
                        response.status(400).json({ error: err });
                    } else {
                        if (req.files) {
                            await sharp(serviceImage.data)
                                .jpeg({
                                    quality: 60,
                                })
                                .toFile(uploadPath)
                                .catch((err) => next(err));

                            await Service.create({ ...info, image: '/uploads/serviceImages/' + fileName });
                            res.status(201).json({
                                message: "service created successfully",
                            })
                        } else {
                            res.status(400).json({
                                error: "جهت آپلود باید عکسی انتخاب کنید",
                            });
                        }
                    }
                } catch (err) {
                    next(err)
                }
            });
        }
    } catch (err) {
        console.log(err);
        next(err)
    }
};
