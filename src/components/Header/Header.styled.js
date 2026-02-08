import styled from "styled-components";
import { CommonContainer } from "styles/GlobalStyles";

export const Container = styled(CommonContainer)`
  padding-top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.lightGray};

  @media only screen and (min-width: 768px) {
    padding-top: 28px;
  }

  @media only screen and (min-width: 1440px) {
    padding-left: 128px;
    padding-right: 128px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and (min-width: 768px) {
    gap: 16px;
  }
`;

export const BurgerBtn = styled.button`
  background: transparent;
  border: none;

  & svg {
    width: 32px;
    height: 26px;
  }
`;

export const WhiteSvg = styled.svg`
  stroke: #fff;
`;

export const GreenSvg = styled.svg`
  stroke: #59b17a;
`;

export const Box = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
