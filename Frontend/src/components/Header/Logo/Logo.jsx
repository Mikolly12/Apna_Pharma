import React from "react";
import logo from "../../../images/logo.png";
import { NavLinkStyled } from "./Logo.styled";

const Logo = ({ pageType }) => {
  const logoColor = pageType === "home" ? "#FFF" : "#1D1E21";

  return (
    <>
      <NavLinkStyled to="/home">
        <img src={logo} alt="logo" />
        <p style={{ color: logoColor }}>Apna-Pharma</p>
      </NavLinkStyled>
    </>
  );
};

export default Logo;
