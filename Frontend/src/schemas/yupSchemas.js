import * as Yup from "yup";

const phoneRegex =
  /^(\+?380|\+?38|\(?0)\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(phoneRegex, "Invalid phone number")
    .required("Required"),
  password: Yup.string()
    .min(6, "Min length 6")
    .max(20, "Max length 20")
    .required("Required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Min length 6")
    .max(20, "Max length 20")
    .required("Required"),
});

export const orderSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(phoneRegex, "Invalid phone number")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  payment: Yup.string()
    .oneOf(["cash", "bank"])
    .required("Payment method is required"),
});
