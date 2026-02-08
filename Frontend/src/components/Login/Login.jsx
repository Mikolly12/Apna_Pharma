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
import { InputBox, MainWrapper } from "./Login.styled";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginThunk } from "../../redux/auth/operations";
import { loginSchema } from "../../schemas/yupSchemas";

const Login = () => {
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
        // ✅ SEND RAW VALUES ONLY
        const result = await dispatch(loginThunk(values)).unwrap();

        if (result) {
          // Check if email is verified (backend should return isVerified flag)
          if (result.isVerified === false) {
            toast.error("Please verify your email first. Check your inbox for the verification code.");
            navigate("/email-verification", { state: { email: values.email } });
          } else {
            navigate("/home");
          }
        }
      } catch (error) {
        const errorMsg = error?.message || "Login failed. Please try again.";
        // If user exists but not verified
        if (errorMsg.includes("not verified") || errorMsg.includes("verify")) {
          toast.error("Please verify your email first. Check your inbox for the verification code.");
          navigate("/email-verification", { state: { email: values.email } });
        } else {
          toast.error("Email or password is invalid");
        }
        console.error("Login error:", error);
      } finally {
        setIsSubmitting(false);
      }
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
            Your medication, delivered. Say goodbye to all{" "}
            <span>your healthcare</span> worries with us
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
                value={formik.values.email}
              />
              {formik.errors.email &&
                formik.touched.email && (
                  <span>{formik.errors.email}</span>
                )}
            </label>

            <label htmlFor="password">
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password &&
                formik.touched.password && (
                  <span>{formik.errors.password}</span>
                )}
            </label>
          </InputBox>

          <BtnBox
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <SubmitBtn type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </SubmitBtn>

            <SubmitBtn
              as={NavLink}
              to="/admin-login"
              style={{
                backgroundColor: "#59B17A",
                padding: "13px 129px",
                textDecoration: "none",
                cursor: "pointer",
                border: "none",
              }}
            >
              Admin Login
            </SubmitBtn>
          </BtnBox>

          <BtnBox style={{ marginTop: "12px" }}>
            <NavLink to="/register">
              Don't have an account?
            </NavLink>
          </BtnBox>
        </form>
      </MainWrapper>
    </Container>
  );
};

export default Login;
