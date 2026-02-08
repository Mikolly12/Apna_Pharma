import React from "react";
import { NavLink } from "react-router-dom";
import { Btn } from "./RegisterBtn.styled";
import { useMediaQuery } from "react-responsive";

const RegisterBtn = ({ pageType }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  const btnColor = !isDesktop
    ? "#f1f1f1"
    : isDesktop && pageType === "home"
    ? "#f1f1f1"
    : "#59B17A";

  const btnBorder = !isDesktop
    ? "1px solid rgba(241, 241, 241, 0.50)"
    : isDesktop && pageType === "home"
    ? "1px solid rgba(241, 241, 241, 0.50)"
    : "1px solid rgba(89, 177, 122, 0.50)";

  return (
    <>
      <Btn type="button" style={{ color: btnColor, border: btnBorder }}>
        <NavLink to="/register">Register</NavLink>
      </Btn>
    </>
  );
};

export default RegisterBtn;
