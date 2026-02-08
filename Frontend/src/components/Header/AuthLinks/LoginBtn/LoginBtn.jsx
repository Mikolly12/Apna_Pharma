import React from "react";
import { NavLink } from "react-router-dom";
import { Btn } from "./LoginBtn.styled";
import { useMediaQuery } from "react-responsive";

const LoginBtn = ({ pageType }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  const btnColor = !isDesktop
    ? "#F1F1F1"
    : isDesktop && pageType === "home"
    ? "#f1f1f1"
    : "#59B17A";

  return (
    <>
      <Btn type="button" style={{ color: btnColor }}>
        <NavLink to="/login">Login</NavLink>
      </Btn>
    </>
  );
};

export default LoginBtn;
