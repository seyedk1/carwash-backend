const Yup = require("yup");

exports.registerSchema = Yup.object().shape({
    username: Yup.string()
        .required("username is required")
        .matches(/^09\d{9}$/,'phone number has not a valid pattern'),
    password: Yup.string()
        .min(4, "password must not less than 4 characthers")
        .max(255, "password must not more than 255 characthers ")
        .required("password is required"),
    confirm_password: Yup.string()
        .required("confirm password is required")
        .oneOf([Yup.ref("password"), null], "password are not same"),
    first_name: Yup.string()
        .min(4, "first_name must not less than 4 characthers")
        .max(255, "first_name must not more than 255 characthers ")
        .required("first_name is required"),
    last_name: Yup.string()
        .min(4, "first_name must not less than 4 characthers")
        .max(255, "first_name must not more than 255 characthers ")
        .required("first_name is required"),
    is_admin: Yup.boolean()
});
