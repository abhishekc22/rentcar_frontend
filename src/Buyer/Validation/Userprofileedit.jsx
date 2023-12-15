import * as yup from "yup";
export const userprofileedit = yup.object().shape({
  username: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(20)
    .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
    .required("Required"),
  phone_number: yup
    .number("Phone number must be a 10 digit number")
    .positive()
    .integer()
    .test("len", "Phone number should be a 10 digit number", (val) =>
      /^\d{10}$/.test(val)
    )
    .required("Required"),
});