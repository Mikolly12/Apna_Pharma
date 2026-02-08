import React from "react";
import { Container, HeroBox, Text, Title } from "./MainBanner.styled";

const MainBanner = () => {
  return (
    <section>
      <Container>
        <HeroBox>
          <Title>Your medication delivered</Title>
          <Text>Say goodbye to all your healthcare worries with us</Text>
        </HeroBox>
      </Container>
    </section>
  );
};

export default MainBanner;
