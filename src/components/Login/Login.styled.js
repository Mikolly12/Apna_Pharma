import styled from "styled-components";

export const MainWrapper = styled.div`
  @media only screen and (min-width: 1440px) {
    display: flex;
    gap: 150px;
  }
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 128px;

  & label {
    position: relative;
  }

  & span {
    position: absolute;
    color: #e85050;
    bottom: -10px;
    left: 18px;
    font-size: 12px;
  }

  & input {
    width: 100%;
    padding: 13px 18px;
    border-radius: 60px;
    border: 1px solid rgba(29, 30, 33, 0.1);
    background: ${({ theme }) => theme.colors.white};
    color: rgba(29, 30, 33, 0.4);
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5em;
  }

  @media only screen and (min-width: 768px) {
    margin-bottom: 62px;

    & input {
      width: 280px;
    }
  }
`;
