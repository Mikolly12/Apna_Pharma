import React from "react";
import {
  Container,
  LinksWrapper,
  MainWrapper,
  Text,
  TextWrapper,
} from "./Footer.styled";
import NavLinks from "./NavLinks/NavLinks";
import Bottom from "./Bottom/Bottom";
import { useMediaQuery } from "react-responsive";
import SocialMediaIcons from "./SocialMediaIcons/SocialMediaIcons";
import Logo from "./Logo/Logo";

const Footer = () => {
  const isTabletOrDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  return (
    <>
      <footer>
        <Container>
          <MainWrapper>
            <TextWrapper>
              <Logo />
              <Text>
                Get the medicine to help you feel better, get back to your
                active life, and enjoy every moment.
              </Text>
            </TextWrapper>
            <LinksWrapper>
              <NavLinks />
              {isTabletOrDesktop && <SocialMediaIcons />}
            </LinksWrapper>
          </MainWrapper>
          <Bottom />
        </Container>
      </footer>
    </>
  );
};

export default Footer;
