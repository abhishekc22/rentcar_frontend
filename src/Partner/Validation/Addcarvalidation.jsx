import * as yup from "yup";

export const Carvalidation = yup.object().shape({
  carname: yup
    .string()
    .min(2, "Car name must be at least 2 characters")
    .max(20)
    .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
    .required("Car name is required"),

  location: yup
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(20)
    .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
    .required("Location is required"),

  price: yup.number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .integer("Price must be an integer")
    .required("Price is required"),

  document: yup.mixed().required("document is required"),

  carimage1: yup.mixed().required("image1 is required"), 
  
  carimage2:yup.mixed().required("image1 is required"), 

});