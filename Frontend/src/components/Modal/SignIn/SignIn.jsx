import React from "react";
import {
  BtnBox,
  InputBox,
  LinkBtn,
  SubmitBtn,
  Text,
  Title,
} from "./SignIn.styled";
import { useFormik } from "formik";
import { loginSchema } from "schemas/yupSchemas";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../../redux/auth/operations";

const SignIn = ({ onClose, onToggleModal }) => {
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    onClose();
    onToggleModal();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginThunk(values));
      onClose();
    },
  });
  return (
    <>
      <Title>Log in to your account</Title>
      <Text>Please login to your account before continuing.</Text>
      <form onSubmit={formik.handleSubmit}>
        <InputBox>
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
          <SubmitBtn type="submit">Log in</SubmitBtn>
          <LinkBtn type="button" onClick={handleToggleModal}>
            Don't have an account?
          </LinkBtn>
        </BtnBox>
      </form>
    </>
  );
};

export default SignIn;
