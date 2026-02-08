import React from "react";
import {
  Banner,
  Box,
  Btn,
  Container,
  List,
  Percentage,
  Round,
  RoundWithTitle,
  Title,
} from "./PromoBanners.styled";

const PromoBanners = () => {
  return (
    <>
      <section>
        <Container>
          <List>
            <Banner>
              <RoundWithTitle>
                <Round>1</Round>
                <Title>Huge Sale</Title>
              </RoundWithTitle>
              <Box>
                <Percentage>70%</Percentage>
                <Btn type="button">Shop now</Btn>
              </Box>
            </Banner>
            <Banner>
              <RoundWithTitle>
                <Round>2</Round>
                <Title>Secure delivery</Title>
              </RoundWithTitle>
              <Box>
                <Percentage>100%</Percentage>
                <Btn type="button">Read more</Btn>
              </Box>
            </Banner>
            <Banner>
              <RoundWithTitle>
                <Round>3</Round>
                <Title>Off</Title>
              </RoundWithTitle>
              <Box>
                <Percentage>35%</Percentage>
                <Btn type="button">Shop now</Btn>
              </Box>
            </Banner>
          </List>
        </Container>
      </section>
    </>
  );
};

export default PromoBanners;
