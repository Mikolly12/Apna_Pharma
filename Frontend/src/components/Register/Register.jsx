import React from "react";
import {
  BtnBox,
  Container,
  ImgWrapper,
  InputBox,
  LogoWrapper,
  MainWrapper,
  SubmitBtn,
  Title,
  TitleBox,
} from "./Register.styled";
import Logo from "components/Header/Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import usualMob from "../../images/pill-mob@1x.png";
import retinaMob from "../../images/pill-mob@2x.png";
import usualTab from "../../images/pill-tab@1x.png";
import retinaTab from "../../images/pill-tab@2x.png";
import { useMediaQuery } from "react-responsive";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/operations";
import { registerSchema } from "../../schemas/yupSchemas";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      // 🔹 Split name into firstName and lastName
      const nameParts = values.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // 🔹 Payload matches backend DTO exactly
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: values.email,
        phoneNumber: values.phone,
        password: values.password,
      };

      dispatch(registerThunk(payload))
        .unwrap()
        .then(() => {
          // navigate to email verification page with email
          navigate("/email-verification", { state: { email: values.email } });
        })
        .catch((err) => {
          console.log("Registration error:", err);
        });
    },
  });

  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <MainWrapper>
        <TitleBox>
          <Title>
            Your medication, delivered Say goodbye to all{" "}
            <span>your healthcare</span> worries with us
          </Title>
          <ImgWrapper>
            {isMobile && (
              <img srcSet={`${usualMob} 1x, ${retinaMob} 2x`} alt="illustration" />
            )}
            {isTabletOrDesktop && (
              <img srcSet={`${usualTab} 1x, ${retinaTab} 2x`} alt="illustration" />
            )}
          </ImgWrapper>
        </TitleBox>
        <form onSubmit={formik.handleSubmit}>
          <InputBox>
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && <span>{formik.errors.name}</span>}
            </label>
            <label htmlFor="email">
              <input
                type="email"
                placeholder="Email address"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && <span>{formik.errors.email}</span>}
            </label>
            <label htmlFor="phone">
              <input
                type="text"
                placeholder="Phone number"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.errors.phone && formik.touched.phone && <span>{formik.errors.phone}</span>}
            </label>
            <label htmlFor="password">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && <span>{formik.errors.password}</span>}
            </label>
          </InputBox>
          <BtnBox>
            <SubmitBtn type="submit">Register</SubmitBtn>
            <NavLink to="/login">Already have an account?</NavLink>
          </BtnBox>
        </form>
      </MainWrapper>
    </Container>
  );
};

export default Register;
