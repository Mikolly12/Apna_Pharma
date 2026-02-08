import React from "react";
import logo from "../../../images/logo.png";
import { NavLinkStyled } from "./Logo.styled";

const Logo = () => {
  return (
    <>
      <NavLinkStyled to="/home">
        <img src={logo} alt="logo" />
        <p>Apna-Pharma</p>
      </NavLinkStyled>
    </>
  );
};

export default Logo;
