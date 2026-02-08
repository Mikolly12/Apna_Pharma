import styled from "styled-components";
import { CommonContainer } from "styles/GlobalStyles";

export const Container = styled(CommonContainer)`
  padding-top: 20px;
  padding-bottom: 20px;
  background: ${({ theme }) => theme.colors.green};

  @media only screen and (min-width: 768px) {
    padding-top: 32px;
    padding-bottom: 32px;
  }

  @media only screen and (min-width: 1440px) {
    padding: 40px 128px;
  }
`;

export const MainWrapper = styled.div`
  @media only screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 88px;
  }

  @media only screen and (min-width: 1440px) {
    gap: 115px;
    margin-bottom: 64px;
  }
`;

export const TextWrapper = styled.div`
  margin-bottom: 40px;

  @media only screen and (min-width: 768px) {
    margin-bottom: 0;
  }
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.lightGray};
  width: 261px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.28em;

  @media only screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 1.25em;
    margin-bottom: 0;
  }

  @media only screen and (min-width: 1440px) {
    width: 311px;
  }
`;

export const LinksWrapper = styled.div`
  @media only screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (min-width: 1440px) {
    flex-direction: row;
    gap: 270px;
  }
`;
