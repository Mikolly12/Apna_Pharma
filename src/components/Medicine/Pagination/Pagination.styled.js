import styled from "styled-components";

export const Wrapper = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: center;
  gap: 17px;

  @media only screen and (min-width: 768px) {
    padding-top: 80px;
    gap: 24px;
  }
`;

export const BtnList = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media only screen and (min-width: 768px) {
    gap: 10px;
  }
`;

export const Btn = styled.button`
  background: ${({ theme, current }) =>
    current ? theme.colors.green : "transparent"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: 1px solid rgba(29, 30, 33, 0.05);
  color: ${({ theme, current }) =>
    current ? theme.colors.white : theme.colors.black};
  font-size: 14px;
  font-weight: 700;
  line-height: 1.28em;

  & svg {
    width: 20px;
    height: 20px;
  }

  @media only screen and (min-width: 768px) {
    width: 44px;
    height: 44px;
    font-size: 18px;
    line-height: 1.22em;

    & svg {
      width: 24px;
      height: 24px;
    }
  }
`;
