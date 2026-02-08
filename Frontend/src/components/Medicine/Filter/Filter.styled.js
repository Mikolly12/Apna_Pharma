import styled from "styled-components";
import Select from "react-select";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;

  @media only screen and (min-width: 768px) {
    margin-bottom: 32px;
    flex-direction: row;
  }

  @media only screen and (min-width: 1440px) {
    margin-bottom: 40px;
  }
`;

export const CustomSelect = styled(Select)`
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: 214px;
  }
`;

export const Label = styled.label`
  position: relative;

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

  & svg {
    position: absolute;
    top: 14px;
    right: 18px;
    stroke: black;
    fill: none;
    width: 16px;
    height: 16px;
  }

  @media only screen and (min-width: 768px) {
    & input {
      width: 224px;
    }
  }
`;

export const SubmitBtn = styled.button`
  width: 116px;
  padding: 13px 30px;
  border-radius: 60px;
  background: ${({ theme }) => theme.colors.green};
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.28em;
  transition: 0.3s ease;

  &:hover {
    background: #3f945f;
  }

  & svg {
    width: 14px;
    height: 14px;
    stroke: ${({ theme }) => theme.colors.white};
  }
`;
