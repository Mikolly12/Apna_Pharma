import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { verifyEmailThunk, resendVerificationCodeThunk } from "../../redux/auth/operations";
import Logo from "components/Header/Logo/Logo";
import usualMob from "../../images/pill-mob@1x.png";
import retinaMob from "../../images/pill-mob@2x.png";
import usualTab from "../../images/pill-tab@1x.png";
import retinaTab from "../../images/pill-tab@2x.png";
import { useMediaQuery } from "react-responsive";
import {
  Container,
  LogoWrapper,
  MainWrapper,
  TitleBox,
  Title,
  ImgWrapper,
  InputBox,
  BtnBox,
  SubmitBtn,
  MessageBox,
  ResendLink,
  InfoText,
} from "./EmailVerification.styled";

const verificationSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .required("Verification code is required")
    .min(6, "Code must be at least 6 characters"),
});

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema: verificationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const result = await dispatch(
          verifyEmailThunk({
            email,
            verificationCode: values.verificationCode,
          })
        ).unwrap();

        if (result) {
          toast.success("Email verified successfully! You can now login.");
          navigate("/login");
        }
      } catch (error) {
        toast.error(error || "Verification failed. Please try again.");
        console.error("Verification error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Get email from location state
  const email = location.state?.email;

  // Redirect if no email
  if (!email) {
    navigate("/register");
    return null;
  }



  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      await dispatch(resendVerificationCodeThunk({ email })).unwrap();
      toast.success("Verification code sent to your email!");
    } catch (error) {
      toast.error(error || "Failed to resend code. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <MainWrapper>
        <TitleBox>
          <Title>
            Verify Your Email Address to get started with{" "}
            <span>your healthcare</span> journey
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
          <MessageBox>
            <InfoText>
              A verification code has been sent to <strong>{email}</strong>
            </InfoText>
            <InfoText>Please enter the code below to verify your email.</InfoText>
          </MessageBox>

          <InputBox>
            <label htmlFor="verificationCode">
              <input
                type="text"
                id="verificationCode"
                placeholder="Enter 6-digit code"
                name="verificationCode"
                onChange={formik.handleChange}
                value={formik.values.verificationCode}
                maxLength="6"
              />
              {formik.errors.verificationCode && formik.touched.verificationCode && (
                <span>{formik.errors.verificationCode}</span>
              )}
            </label>
          </InputBox>

          <BtnBox>
            <SubmitBtn type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </SubmitBtn>
          </BtnBox>

          <BtnBox style={{ marginTop: "12px" }}>
            <ResendLink onClick={handleResendCode} disabled={resendLoading}>
              {resendLoading ? "Sending..." : "Didn't receive the code? Resend"}
            </ResendLink>
          </BtnBox>
        </form>
      </MainWrapper>
    </Container>
  );
};

export default EmailVerification;
