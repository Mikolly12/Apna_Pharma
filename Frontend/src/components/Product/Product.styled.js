import styled from "styled-components";
import { CommonContainer } from "styles/GlobalStyles";

export const Container = styled(CommonContainer)`
  padding-top: 64px;
  padding-bottom: 80px;
  background: ${({ theme }) => theme.colors.lightGray};

  @media only screen and (min-width: 768px) {
    padding-top: 62px;
    padding-bottom: 120px;
  }

  @media only screen and (min-width: 1440px) {
    padding: 100px 128px 120px;
    display: flex;
    gap: 20px;
  }
`;
