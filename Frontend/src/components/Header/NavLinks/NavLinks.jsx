import React from "react";
import { NavLink } from "react-router-dom";
import { NavBox, NavList, Wrapper } from "./NavLinks.styled";
import sprite from "../../../images/sprite.svg";
import { useMediaQuery } from "react-responsive";

const NavLinks = () => {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1439px)" });
  return (
    <>
      <Wrapper>
        {isMobileOrTablet ? (
          <svg>
            <use href={`${sprite}#nav-vertical`} />
          </svg>
        ) : (
          <svg>
            <use href={`${sprite}#nav-horyzontal`} />
          </svg>
        )}
        <NavBox>
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
        </NavBox>
      </Wrapper>
    </>
  );
};

export default NavLinks;
