import React, { useState } from "react";
import Logo from "components/Header/Logo/Logo";
import usualMob from "../../images/pill-mob@1x.png";
import retinaMob from "../../images/pill-mob@2x.png";
import usualTab from "../../images/pill-tab@1x.png";
import retinaTab from "../../images/pill-tab@2x.png";
import { useMediaQuery } from "react-responsive";
import {
  BtnBox,
  Container,
  ImgWrapper,
  LogoWrapper,
  SubmitBtn,
  Title,
  TitleBox,
} from "components/Register/Register.styled";
import { NavLink, useNavigate } from "react-router-dom";
import { InputBox, MainWrapper } from "./AdminLogin.styled";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { adminLoginThunk } from "../../redux/admin/operations";
import { loginSchema } from "../../schemas/yupSchemas";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTabletOrDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const result = await dispatch(adminLoginThunk(values));
        if (result.payload) {
          navigate("/admin/dashboard");
        }
      } catch (error) {
        toast.error("Admin login failed. Please try again.");
        console.error("Admin login error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <Container>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <MainWrapper>
          <TitleBox>
            <Title>
              Admin Dashboard
              <span> - Manage Your Apna-Pharma</span>
            </Title>
            <ImgWrapper>
              {isMobile && (
                <img
                  srcSet={`${usualMob} 1x, ${retinaMob} 2x`}
                  alt="illustration"
                />
              )}
              {isTabletOrDesktop && (
                <img
                  srcSet={`${usualTab} 1x, ${retinaTab} 2x`}
                  alt="illustration"
                />
              )}
            </ImgWrapper>
          </TitleBox>
          <form onSubmit={formik.handleSubmit}>
            <InputBox>
              <label htmlFor="email">
                <input
                  type="text"
                  id="email"
                  placeholder="Email address"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email.trim()}
                />
                {formik.errors.email && formik.touched.email ? (
                  <span>{formik.errors.email}</span>
                ) : null}
              </label>
              <label htmlFor="password">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password.trim()}
                />
                {formik.errors.password && formik.touched.password ? (
                  <span>{formik.errors.password}</span>
                ) : null}
              </label>
            </InputBox>
            <BtnBox style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
              <SubmitBtn type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Admin Login"}
              </SubmitBtn>
              <NavLink 
                to="/login"
                style={{
                  textAlign: "center",
                  color: "#59B17A",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Back to Customer Login
              </NavLink>
            </BtnBox>
          </form>
        </MainWrapper>
      </Container>
    </>
  );
};

export default AdminLogin;
