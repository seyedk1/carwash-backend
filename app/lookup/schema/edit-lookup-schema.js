const Yup = require("yup");

exports.editLookupSchema = Yup.object().shape({
    parent_id: Yup.number()
        .moreThan(0, "parent_id is wrong pattern"),
    title: Yup.string()
        .min(4, "title must not less than 4 characthers")
        .max(255, "title must not more than 255 characthers ")
        .required("title is required")
});
