import styled from "styled-components";
import { CommonContainer } from "styles/GlobalStyles";

export const Container = styled(CommonContainer)`
  padding-top: 64px;
  padding-bottom: 80px;
  background: ${({ theme }) => theme.colors.lightGray};

  @media only screen and (min-width: 768px) {
    padding-top: 80px;
    padding-bottom: 120px;
  }

  @media only screen and (min-width: 1440px) {
    padding: 100px 128px 120px;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  font-size: 28px;
  font-weight: 600;
  line-height: 1.14em;
  margin-bottom: 40px;

  @media only screen and (min-width: 768px) {
    margin-bottom: 32px;
  }

  @media only screen and (min-width: 1440px) {
    margin-bottom: 40px;
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;

  @media only screen and (min-width: 768px) {
    gap: 64px;
  }

  @media only screen and (min-width: 1440px) {
    flex-direction: row;
    gap: 96px;
  }
`;
