import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavLinkStyled = styled(NavLink)`
  display: flex;
  gap: 12px;
  align-items: center;

  & img {
    width: 32px;
    height: 32px;
    background: ${({ theme }) => theme.colors.lightGray};
  }

  & p {
    color: ${({ theme }) => theme.colors.lightGray};
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.48px;
  }

  @media only screen and (min-width: 768px) {
    gap: 14px;

    & img {
      width: 44px;
      height: 44px;
    }

    & p {
      font-size: 20px;
      letter-spacing: -0.6px;
    }
  }
`;
