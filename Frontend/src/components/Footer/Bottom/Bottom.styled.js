import styled from "styled-components";

export const Wrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.borders.outline};
  padding-top: 20px;

  @media only screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    padding-top: 33px;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 10px;
  font-weight: 400;
  line-height: 1em;

  @media only screen and (min-width: 768px) {
    gap: 24px;
    font-size: 14px;
    line-height: 1.28em;
  }
`;
