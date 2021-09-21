const Yup = require("yup");

exports.createServiceSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, "name must not less than 4 characthers")
        .max(255, "name must not more than 255 characthers ")
        .required("name is required"),
    image: Yup.object().shape({
        name: Yup.string().required("service image is required"),
        size: Yup.number().max(4000000, "image size should not bigger than 4 MB"),
        mimetype: Yup.mixed().oneOf(
            ["image/jpeg", "image/png", "image/jpg"],
            "support png, jpg and jpeg for images"
        ),
    }),
    price: Yup.number()
        .moreThan(0, "price should more than 0")
        .lessThan(2000000, "price should less than 10000$")
        .required("price is required"),
    description: Yup.string()
        .min(4, "name must not less than 4 characthers")
        .max(255, "name must not more than 255 characthers ")
});
