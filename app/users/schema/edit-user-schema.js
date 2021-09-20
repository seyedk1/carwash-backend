const Yup = require("yup");

exports.editUserSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(4, "first_name must not less than 4 characthers")
        .max(255, "first_name must not more than 255 characthers "),
    last_name: Yup.string()
        .min(4, "first_name must not less than 4 characthers")
        .max(255, "first_name must not more than 255 characthers ")
});
