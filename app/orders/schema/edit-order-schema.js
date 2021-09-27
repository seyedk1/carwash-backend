const Yup = require("yup");

exports.editOrderSchema = Yup.object().shape({
    car_id: Yup.string(),
    car_brand_id: Yup.string(),
    car_color_id: Yup.string(),
    service_id: Yup.string(),
    service_date: Yup.string()
        .matches(/^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|([1-2][0-9])|(0[1-9]))))$/, 'service date is not valid'),
    service_hour: Yup.mixed()
        .oneOf(['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']),
    address: Yup.string()
        .min(4, "address must not less than 4 characthers")
        .max(255, "address must not more than 255 characthers ")
});
