import React, { useState } from "react";
import Logo from "./Logo/Logo";
import sprite from "../../images/sprite.svg";
import {
  Box,
  BurgerBtn,
  Container,
  GreenSvg,
  WhiteSvg,
  Wrapper,
} from "./Header.styled";
import Menu from "./Menu/Menu";
import { useMediaQuery } from "react-responsive";
import NavLinks from "./NavLinks/NavLinks";
import AuthLinks from "./AuthLinks/AuthLinks";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserIcons from "./UserIcons/UserIcons";

const Header = ({ pageType }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1440px)",
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const headerBackground = pageType === "home" ? "#59B17A" : "#F7F8FA";

  return (
    <>
      <header>
        <Container style={{ background: headerBackground }}>
          <Logo pageType={pageType} />
          {isLoggedIn && !isDesktop && (
            <Wrapper>
              <UserIcons pageType={pageType} />
              <BurgerBtn type="button" onClick={handleOpenMenu}>
                {pageType === "home" ? (
                  <WhiteSvg>
                    <use href={`${sprite}#burger`} />
                  </WhiteSvg>
                ) : (
                  <GreenSvg>
                    <use href={`${sprite}#burger`} />
                  </GreenSvg>
                )}
              </BurgerBtn>
            </Wrapper>
          )}
          {!isLoggedIn && !isDesktop && (
            <BurgerBtn type="button" onClick={handleOpenMenu}>
              {pageType === "home" ? (
                <WhiteSvg>
                  <use href={`${sprite}#burger`} />
                </WhiteSvg>
              ) : (
                <GreenSvg>
                  <use href={`${sprite}#burger`} />
                </GreenSvg>
              )}
            </BurgerBtn>
          )}
          {isLoggedIn && isDesktop && (
            <>
              <NavLinks />
              <Box>
                <UserIcons pageType={pageType} />
                <AuthLinks pageType={pageType} />
              </Box>
            </>
          )}
          {!isLoggedIn && isDesktop && (
            <>
              <NavLinks />
              <AuthLinks pageType={pageType} />
            </>
          )}
        </Container>
      </header>
      <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} pageType={pageType} />
    </>
  );
};

export default Header;
