const Yup = require("yup");

exports.createOrderSchema = Yup.object().shape({
    car_id: Yup.string()
        .required("car_id is required"),
    car_brand_id: Yup.string()
        .required("car_brand_id is required"),
    car_color_id: Yup.string()
        .required("car_color_id is required"),
    service_id: Yup.string()
        .required("service_id is required"),
    service_date: Yup.string()
        .required("service_date is required")
        .matches(/^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|([1-2][0-9])|(0[1-9]))))$/, 'service date is not valid'),
    service_hour: Yup.mixed()
        .required("service_hour is required")
        .oneOf(['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']),
    address: Yup.string()
        .required('address is required')
        .min(4, "address must not less than 4 characthers")
        .max(255, "address must not more than 255 characthers ")
});
