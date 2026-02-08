import React from "react";
import { NavLink } from "react-router-dom";
import { NavList } from "./NavLinks.styled";

const NavLinks = () => {
  return (
    <>
      <NavList>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/medicine-store">Medicine store</NavLink>
        </li>
        <li>
          <NavLink to="/medicine">Medicine</NavLink>
        </li>
      </NavList>
    </>
  );
};

export default NavLinks;
