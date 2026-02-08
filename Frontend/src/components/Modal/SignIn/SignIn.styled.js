import styled from "styled-components";

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.14em;
  margin-bottom: 14px;
`;

export const Text = styled.p`
  color: #6a6a6f;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.28em;
  margin-bottom: 25px;

  @media only screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 1.25em;
  }
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 25px;

  & input {
    width: 100%;
    border-radius: 60px;
    border: 1px solid rgba(29, 30, 33, 0.1);
    padding: 13px 18px;
    color: rgba(29, 30, 33, 0.4);
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5em;
  }

  & span {
    color: #e85050;
    font-size: 12px;
    margin-left: 18px;
  }

  @media only screen and (min-width: 768px) {
    gap: 14px;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const SubmitBtn = styled.button`
  border-radius: 60px;
  background: ${({ theme }) => theme.colors.green};
  padding: 13px 100px;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.28em;
  transition: 0.3s ease;

  &:hover {
    background: #3f945f;
  }
`;

export const LinkBtn = styled.button`
  background: transparent;
  color: rgba(29, 30, 33, 0.4);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5em;
`;
