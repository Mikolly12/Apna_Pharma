import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 302px;

  @media only screen and (min-width: 768px) {
    margin-bottom: 422px;
  }

  @media only screen and (min-width: 1440px) {
    margin-bottom: 0;

    & svg {
      width: 344px;
      height: 46px;
    }
  }
`;

export const NavBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 34px;

  & li {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray};

    &:hover {
      color: ${({ theme }) => theme.colors.black};
    }
  }

  & a {
    padding: 8px 18px;
    border-radius: 24px;
  }

  & a.active {
    background: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      background: #3f945f;
    }
  }

  @media only screen and (min-width: 1440px) {
    flex-direction: row;
    gap: 28px;

    & a {
      padding: 8px 12px;
      min-width: 80px;
    }

    & a.active {
      background: ${({ theme }) => theme.colors.green};
    }
  }
`;
