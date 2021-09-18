const Yup = require("yup");

exports.registerSchema = Yup.object().shape({
    username: Yup.string()
        .required("username is required"),
    password: Yup.string()
        .min(4, "password must not less than 4 characthers")
        .max(255, "password must not more than 255 characthers ")
        .required("password is required"),
    confirmPassword: Yup.string()
        .required("confirm password is required")
        .oneOf([Yup.ref("password"), null], "password are not same"),
    isAdmin: Yup.boolean()
});
