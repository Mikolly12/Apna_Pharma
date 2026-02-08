import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.green};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;

  & h3 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }

  & p {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const NavLinkStyled = styled(NavLink)`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.green};
  padding: 5px 20px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;
