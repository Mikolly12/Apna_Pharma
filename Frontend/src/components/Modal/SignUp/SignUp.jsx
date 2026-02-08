import React from "react";
import {
  BtnBox,
  InputBox,
  LinkBtn,
  SubmitBtn,
  Text,
  Title,
} from "../SignIn/SignIn.styled";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { registerSchema } from "schemas/yupSchemas";
import { registerThunk } from "../../../redux/auth/operations";

const SignUp = ({ onClose, onToggleModal }) => {
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    onClose();
    onToggleModal();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerThunk(values))
        .unwrap()
        .then(() => {
          handleToggleModal();
        });
    },
  });

  return (
    <>
      <Title>Sign Up</Title>
      <Text>Before proceeding, please register on our site.</Text>
      <form onSubmit={formik.handleSubmit}>
        <InputBox>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="User Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name ? (
              <span>{formik.errors.name}</span>
            ) : null}
          </label>
          <label htmlFor="email">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email address"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <span>{formik.errors.email}</span>
            ) : null}
          </label>
          <label htmlFor="phone">
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone number"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <span>{formik.errors.phone}</span>
            ) : null}
          </label>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <span>{formik.errors.password}</span>
            ) : null}
          </label>
        </InputBox>
        <BtnBox>
          <SubmitBtn type="submit">Sign Up</SubmitBtn>
          <LinkBtn type="button" onClick={handleToggleModal}>
            Already have an account?
          </LinkBtn>
        </BtnBox>
      </form>
    </>
  );
};

export default SignUp;
