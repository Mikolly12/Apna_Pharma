import styled from "styled-components";

export const NavList = styled.ul`
  display: flex;
  gap: 32px;
  margin-bottom: 80px;

  & a {
    color: ${({ theme }) => theme.colors.lightGray};
    font-size: 14px;
    font-weight: 600;
    line-height: 1.28em;
  }

  @media only screen and (min-width: 768px) {
    margin-bottom: 32px;

    & a {
      font-size: 16px;
    }
  }

  @media only screen and (min-width: 1440px) {
    gap: 50px;
    margin-bottom: 0;
  }
`;
